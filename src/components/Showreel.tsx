import { showreel } from '../data/content';
import { MediaPanel } from './MediaPanel';
import { Reveal } from './Reveal';
import { LiquidHeading } from './LiquidText';
import type { Project } from '../types';

export function Showreel({ onPlay }: { onPlay: (project: Project) => void }) {
  return (
    <section id="showreel" className="f-sec showreel-section chapter-section" data-tone="white" aria-labelledby="showreel-title">
      <div className="f-grid">
        <Reveal className="showreel-heading"><LiquidHeading id="showreel-title" className="f-title">Showreel</LiquidHeading></Reveal>
        <Reveal className="showreel-wrap"><MediaPanel item={showreel} onPlay={onPlay} /></Reveal>
      </div>
    </section>
  );
}
