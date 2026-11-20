import { Fragment, useEffect, useRef } from 'react';
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import type { ReactNode, RefObject } from 'react';

const svgNamespace = 'http://www.w3.org/2000/svg';
let filterSequence = 0;

// The downloaded reference uses a blur and alpha threshold to resolve liquid
// lettering as it enters the viewport. Keep its curve and filter coefficients.
function useLiquidReveal(target: RefObject<HTMLElement | null>, words = false) {
  const reduced = useReducedMotion();
  const nearby = useInView(target, { margin: '500px 0px', once: true });
  const phone = typeof window !== 'undefined' && window.matchMedia('(max-width: 809.98px)').matches;
  const { scrollYProgress } = useScroll({
    target,
    offset: words
      ? (phone ? ['start 0.95', 'end 0.6'] : ['start 0.92', 'end 0.45'])
      : ['start end', 'start 0.4'],
  });
  const draw = useRef<(progress: number) => void>(() => {});
  useMotionValueEvent(scrollYProgress, 'change', progress => draw.current(progress));

  useEffect(() => {
    const root = target.current;
    if (!root || reduced || !nearby) return;
    const definitions = document.createElementNS(svgNamespace, 'svg');
    definitions.classList.add('fx-defs');
    definitions.setAttribute('width', '0');
    definitions.setAttribute('height', '0');
    definitions.setAttribute('aria-hidden', 'true');
    definitions.setAttribute('focusable', 'false');
    const elements = words ? [...root.querySelectorAll<HTMLElement>('.f-w')] : [root];
    const records = elements.map(element => {
      const filter = document.createElementNS(svgNamespace, 'filter');
      filter.id = 'portfolio-liquid-' + ++filterSequence;
      filter.setAttribute('color-interpolation-filters', 'sRGB');
      const blur = document.createElementNS(svgNamespace, 'feGaussianBlur');
      blur.setAttribute('in', 'SourceGraphic');
      blur.setAttribute('result', 'blurred');
      const matrix = document.createElementNS(svgNamespace, 'feColorMatrix');
      matrix.setAttribute('in', 'blurred');
      matrix.setAttribute('type', 'matrix');
      filter.append(blur, matrix);
      definitions.append(filter);
      return {
        element, filter, blur, matrix, max: 0, last: -1,
        originalColor: element.style.color,
        originalFilter: element.style.filter,
      };
    });
    document.body.append(definitions);

    draw.current = progress => {
      records.forEach((record, index) => {
        const start = words && records.length > 1 ? index / (records.length - 1) * 0.78 : 0;
        const local = Math.min(1, Math.max(0, (progress - start) / (words ? 0.22 : 1)));
        const amount = record.max * Math.pow(1 - local, 1.6);
        const radius = amount < 0.25 ? 0 : amount;
        if (record.last >= 0 && Math.abs(radius - record.last) < 0.25 && radius !== 0) return;
        record.last = radius;
        if (radius === 0) {
          record.element.style.filter = record.originalFilter;
          record.element.style.color = record.originalColor;
          return;
        }
        const threshold = Math.min(0.42, 0.5 * Math.min(1, 0.19 + 5.3 / Math.max(radius * 40 / record.max, 0.01)));
        const gain = 24 - 18 * Math.min(1, radius / record.max);
        const bias = 0.5 - gain * threshold;
        record.blur.setAttribute('stdDeviation', radius.toFixed(2));
        record.matrix.setAttribute('values', `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${gain.toFixed(3)} ${bias.toFixed(3)}`);
        record.element.style.filter = `url(#${record.filter.id})`;
        const red = Math.min(1, radius / (8 * record.max / 40)) * 100;
        record.element.style.color = `color-mix(in srgb, var(--liquid-from) ${red.toFixed(1)}%, currentColor)`;
      });
    };

    const measure = () => {
      records.forEach(record => {
        record.max = Math.max(2, Math.min(40, parseFloat(getComputedStyle(record.element).fontSize) * (words ? 0.2 : 0.24)));
        const padding = record.max * 3;
        const width = Math.max(1, record.element.offsetWidth);
        const height = Math.max(1, record.element.offsetHeight);
        record.filter.setAttribute('x', (-padding / width).toFixed(4));
        record.filter.setAttribute('y', (-padding / height).toFixed(4));
        record.filter.setAttribute('width', (1 + 2 * padding / width).toFixed(4));
        record.filter.setAttribute('height', (1 + 2 * padding / height).toFixed(4));
        record.last = -1;
      });
      draw.current(scrollYProgress.get());
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      observer.disconnect();
      draw.current = () => {};
      definitions.remove();
      records.forEach(record => {
        record.element.style.filter = record.originalFilter;
        record.element.style.color = record.originalColor;
      });
    };
  }, [target, reduced, words, scrollYProgress, nearby]);
}

export function LiquidHeading({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLiquidReveal(ref);
  return <h2 id={id} className={className + ' liquid-heading'} ref={ref}>{children}</h2>;
}

export function LiquidLede({ className, text, children }: { className: string; text: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useLiquidReveal(ref, true);
  const words = text.split(/\s+/);
  return (
    <p className={className} ref={ref}>
      {children}{' '}
      {words.map((word, index) => <Fragment key={index}><span className="f-w">{word}</span>{index < words.length - 1 ? ' ' : ''}</Fragment>)}
    </p>
  );
}
