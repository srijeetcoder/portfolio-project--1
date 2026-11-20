export interface FlightRect { left: number; top: number; width: number; height: number }
export interface RibbonBridge {
  open: (id: string, dialog: HTMLDialogElement, figure: () => FlightRect, video: HTMLVideoElement | null) => Promise<boolean>;
  close: (id: string) => Promise<boolean>;
  holding: (id: string) => boolean;
  cancel: () => void;
}
export const ribbonBridge: { current: RibbonBridge | null } = { current: null };
