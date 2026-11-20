import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function RollContent({ label, arrow = true, upward = false }: { label: string; arrow?: boolean; upward?: boolean }) {
  const Icon = upward ? ArrowUpRight : ArrowRight;
  return <>
    <span className="f-roll"><span className="f-roll__in">
      <span className="f-roll__t">{label}</span>
      <span className="f-roll__t f-roll__t--b" aria-hidden="true">{label}</span>
    </span></span>
    {arrow && <span className="f-showall__arrs" aria-hidden="true">
      <Icon className="f-showall__arr" size={14} strokeWidth={1.4} />
      <Icon className="f-showall__arr f-showall__arr--b" size={14} strokeWidth={1.4} />
    </span>}
  </>;
}
