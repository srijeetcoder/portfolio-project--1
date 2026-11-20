param(
  [Parameter(Mandatory = $true)][string]$Workspace,
  [Parameter(Mandatory = $true)][string]$Branch,
  [string]$Remote = 'origin',
  [int]$IntervalSeconds = 120
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path -LiteralPath $Workspace).Path
Set-Location -LiteralPath $taskRoot
$controlRoot = Join-Path $taskRoot '.qa'
[System.IO.Directory]::CreateDirectory($controlRoot) | Out-Null
$stopFile = Join-Path $controlRoot 'push-stop'
$pauseFile = Join-Path $controlRoot 'push-pause'
$statusFile = Join-Path $controlRoot 'push-status.json'
$logFile = Join-Path $controlRoot 'push.log'
$expectedRemote = 'https://github.com/srijeetcoder/portfolio-project--1.git'
$env:GIT_TERMINAL_PROMPT = '0'

function Invoke-TaskGit([string[]]$Arguments) {
  $savedPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $lines = @(& rtk proxy git @Arguments 2>&1 | ForEach-Object { [string]$_ })
  $code = $LASTEXITCODE
  $ErrorActionPreference = $savedPreference
  [System.IO.File]::AppendAllText($logFile, ([DateTime]::UtcNow.ToString('o') + ' git ' + ($Arguments -join ' ') + "`n" + ($lines -join "`n") + "`n"))
  return [pscustomobject]@{ Code = $code; Lines = $lines }
}

function Write-TaskStatus([string]$State, [string]$Detail = '') {
  $head = Invoke-TaskGit -Arguments @('rev-parse', '--short', 'HEAD')
  $commit = @($head.Lines | Where-Object { $_ -match '^[0-9a-f]{7,40}$' }) -join ''
  $data = @{ state = $State; detail = $Detail; commit = $commit; branch = $Branch; timestampUtc = [DateTime]::UtcNow.ToString('o') }
  [System.IO.File]::WriteAllText($statusFile, ($data | ConvertTo-Json))
}

function Test-TaskRepository {
  $root = Invoke-TaskGit -Arguments @('rev-parse', '--show-toplevel')
  if ($root.Code -ne 0 -or -not ($root.Lines -contains $taskRoot.Replace('\', '/'))) { throw 'Workspace changed; checkpoint push stopped.' }
  $current = Invoke-TaskGit -Arguments @('branch', '--show-current')
  if ($current.Code -ne 0 -or -not ($current.Lines -contains $Branch)) { throw 'Branch changed; checkpoint push stopped.' }
  $url = Invoke-TaskGit -Arguments @('remote', 'get-url', $Remote)
  if ($url.Code -ne 0 -or -not ($url.Lines -contains $expectedRemote)) { throw 'Remote changed; checkpoint push stopped.' }
}

try {
  Test-TaskRepository
  Write-TaskStatus 'waiting'
  $nextPush = [DateTime]::UtcNow.AddSeconds($IntervalSeconds)
  while (-not (Test-Path -LiteralPath $stopFile)) {
    if ([DateTime]::UtcNow -lt $nextPush) { Start-Sleep -Milliseconds 500; continue }
    $nextPush = $nextPush.AddSeconds($IntervalSeconds)
    Test-TaskRepository
    if (Test-Path -LiteralPath $pauseFile) {
      $push = Invoke-TaskGit -Arguments @('push', $Remote, $Branch)
      Write-TaskStatus 'waiting' 'Local media checks are running; the published checkpoint stays clean.'
      continue
    }
    $stage = Invoke-TaskGit -Arguments @('add', '-A')
    if ($stage.Code -ne 0) { Write-TaskStatus 'error' 'Could not stage this checkpoint.'; continue }
    $diff = Invoke-TaskGit -Arguments @('diff', '--cached', '--quiet')
    if ($diff.Code -eq 1) {
      $savedPreference = $ErrorActionPreference
      $ErrorActionPreference = 'Continue'
      $check = @(& rtk proxy npm.cmd run typecheck 2>&1 | ForEach-Object { [string]$_ })
      $checkCode = $LASTEXITCODE
      $ErrorActionPreference = $savedPreference
      [System.IO.File]::AppendAllText($logFile, (($check -join "`n") + "`n"))
      if ($checkCode -ne 0) { Write-TaskStatus 'waiting' 'Waiting for the current edit to pass TypeScript checks.'; continue }
      $commit = Invoke-TaskGit -Arguments @('commit', '-m', 'Refine portfolio visuals and interactions')
      if ($commit.Code -ne 0) { Write-TaskStatus 'error' 'Checkpoint commit failed.'; continue }
    } elseif ($diff.Code -ne 0) {
      Write-TaskStatus 'error' 'Could not inspect staged changes.'
      continue
    }
    $push = Invoke-TaskGit -Arguments @('push', $Remote, $Branch)
    if ($push.Code -eq 0) { Write-TaskStatus 'pushed' } else { Write-TaskStatus 'error' 'GitHub push failed; see .qa/push.log.' }
  }
  Write-TaskStatus 'stopped'
} catch {
  Write-TaskStatus 'error' $_.Exception.Message
  exit 1
}
