import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { portfolio } from '../data/content';
import { Reveal } from './Reveal';
import { LiquidHeading } from './LiquidText';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const items = portfolio.testimonials;
  if (!items.length) return null;
  const testimonial = items[active];
  function move(direction: number) {
    setActive(index => (index + direction + items.length) % items.length);
  }
  return (
    <section id="reviews" className="f-sec f-rv testimonials-section" aria-labelledby="testimonials-title">
      <div className="f-grid">
        <Reveal className="reviews-heading">
          <LiquidHeading id="testimonials-title" className="f-rv__title">What people say</LiquidHeading>
        </Reveal>
        <div className="f-rv__box" role="group" tabIndex={0} aria-roledescription="carousel" aria-label="Testimonials"
          onKeyDown={event => {
            if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          }}>
          <span className="f-rv__mark" aria-hidden="true"><span className="f-rv__mark-in">“</span></span>
          <figure className="f-rv__item testimonial" aria-live="polite">
            {testimonial.isPlaceholder && <p className="placeholder-note">Testimonial placeholder</p>}
            <blockquote className="f-rv__quote">{testimonial.quote}</blockquote>
            <figcaption className="f-rv__who">
              <span className="f-rv__dash" aria-hidden="true" />
              <span className="f-rv__name">{testimonial.name}</span>
              <span className="f-rv__role">{testimonial.role}</span>
            </figcaption>
          </figure>
          {items.length > 1 && (
            <div className="f-rv__nav">
              <button className="f-rv__btn" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
              <span className="f-rv__count">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              <button className="f-rv__btn" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
