import { useSyncExternalStore } from 'react';

const weights = { fonts: 15, hero: 15, poster: 15, motion: 15, background: 15, gallery: 15, marble: 10 };
export type BootTask = keyof typeof weights;
interface BootState { completed: Set<BootTask>; released: boolean; listeners: Set<() => void> }
const client = typeof window === 'undefined' ? null : window as Window & { __portfolioBoot?: BootState };
export const bootRuntime: BootState = client ? (client.__portfolioBoot ??= { completed: new Set(), released: false, listeners: new Set() })
  : { completed: new Set(), released: false, listeners: new Set() };
const notify = () => { for (const listener of bootRuntime.listeners) listener(); };
const subscribe = (listener: () => void) => { bootRuntime.listeners.add(listener); return () => { bootRuntime.listeners.delete(listener); }; };
export const bootProgress = () => [...bootRuntime.completed].reduce((value, task) => value + weights[task], 0);

export function completeBootTask(task: BootTask) {
  if (bootRuntime.completed.has(task)) return;
  bootRuntime.completed.add(task); notify();
}
export function releasePortfolio() {
  if (bootRuntime.released) return;
  bootRuntime.released = true; notify();
}
export function settleBootFallbacks() { for (const task of Object.keys(weights) as BootTask[]) completeBootTask(task); }
export function useBootProgress() { return useSyncExternalStore(subscribe, bootProgress, () => 0); }
export function usePortfolioReady() { return useSyncExternalStore(subscribe, () => bootRuntime.released, () => false); }
