'use client';

import { useEffect, useRef, useState } from 'react';
import { m as motion, useInView, useReducedMotion } from 'motion/react';
import { easeOutQuart, revealTiming } from '../lib/motionSettings';

// Measure the actual type rather than guessing line breaks from character
// counts. The temporary paragraph has no effect on layout or accessibility.
function measureLines(element: HTMLElement, text: string) {
  const style = getComputedStyle(element);
  const width = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  if (width < 1) return null;
  const paragraph = document.createElement('p');
  paragraph.setAttribute('aria-hidden', 'true');
  Object.assign(paragraph.style, {
    position: 'fixed', top: '0', left: '0', visibility: 'hidden', pointerEvents: 'none',
    width: `${width}px`, margin: '0', padding: '0', border: '0', whiteSpace: 'normal',
    font: style.font, fontKerning: style.fontKerning, fontFeatureSettings: style.fontFeatureSettings,
    fontVariationSettings: style.fontVariationSettings, letterSpacing: style.letterSpacing,
    wordSpacing: style.wordSpacing, lineHeight: style.lineHeight, textTransform: style.textTransform,
    wordBreak: style.wordBreak, overflowWrap: style.overflowWrap,
  });
  paragraph.textContent = text;
  document.body.append(paragraph);
  const lines: string[] = [];
  const range = document.createRange();
  let offset = 0, top = -Infinity;
  try {
    // Character ranges also handle long words, emoji and narrow phone widths.
    for (const character of text) {
      range.setStart(paragraph.firstChild!, offset);
      offset += character.length;
      range.setEnd(paragraph.firstChild!, offset);
      const nextTop = range.getBoundingClientRect().top;
      if (!lines.length || (character.trim() && Math.abs(nextTop - top) > 2)) {
        lines.push(character);
        top = nextTop;
      } else lines[lines.length - 1] += character;
    }
    return lines.map(line => line.trim());
  } finally { paragraph.remove(); }
}

export function LineReveal({ children, className = '', delay = 0 }: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const nearby = useInView(ref, { once: true, margin: '500px 0px' });
  const entered = useInView(ref, { once: true, margin: revealTiming.margin });
  const played = useRef(false);
  const [lines, setLines] = useState<string[] | null>(null);
  const [phone, setPhone] = useState(false);
  const text = children.replace(/\s+/g, ' ').trim();

  useEffect(() => {
    if (entered) played.current = true;
  }, [entered]);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !nearby) return;
    let cancelled = false, lastMeasure = '';
    const measure = (force = false) => {
      if (cancelled || !element.clientWidth) return;
      const style = getComputedStyle(element);
      const signature = `${element.clientWidth}|${style.font}|${style.letterSpacing}|${style.fontVariationSettings}`;
      if (!force && signature === lastMeasure) return;
      lastMeasure = signature;
      const next = measureLines(element, text);
      if (next) setLines(previous => previous?.join('\n') === next.join('\n') ? previous : next);
    };
    const observer = new ResizeObserver(() => measure());
    observer.observe(element);
    const query = matchMedia('(max-width: 809.98px)');
    const resize = () => { setPhone(query.matches); measure(true); };
    query.addEventListener('change', resize);
    resize();
    void document.fonts.ready.then(() => measure(true));
    return () => { cancelled = true; observer.disconnect(); query.removeEventListener('change', resize); };
  }, [text, reduced, nearby]);

  return (
    <p className={`line-reveal ${className}`} ref={ref} data-line-reveal>
      {reduced || !lines ? text : <>
        <span className="sr-only">{text}</span>
        {lines.map((line, index) => (
          <span className="line-reveal__mask" aria-hidden="true" key={`${index}:${line}`}>
            <motion.span className="line-reveal__line"
              initial={played.current ? false : { y: '105%' }}
              animate={{ y: entered ? '0%' : '105%' }}
              transition={{ duration: revealTiming.lines.duration, ease: easeOutQuart,
                delay: delay + revealTiming.lines.delay + index * (phone ? revealTiming.lines.phoneStagger : revealTiming.lines.desktopStagger) }}
            >{line}{' '}</motion.span>
          </span>
        ))}
      </>}
    </p>
  );
}
