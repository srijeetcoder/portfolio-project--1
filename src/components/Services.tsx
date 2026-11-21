import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { m as motion, useInView, useReducedMotion } from 'motion/react';
import { portfolio } from '../data/content';
import { LiquidHeading } from './LiquidText';
import { LineReveal } from './LineReveal';
import { easeOutCubic, revealTiming } from '../lib/motionSettings';

function ServiceRow({ service, index }: { service: (typeof portfolio.services)[number]; index: number }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const reduced = useReducedMotion();
  const entered = useInView(ref, { once: true, margin: revealTiming.margin });
  const visible = reduced || entered;
  return (
    <details ref={ref} className="service-item" data-entered={visible ? 'true' : 'false'}>
      <summary>
        <h3 className="service-title-mask">
          <motion.span className="service-title" initial={reduced ? false : { y: '105%' }}
            animate={{ y: visible ? '0%' : '105%' }}
            transition={{ duration: reduced ? 0 : revealTiming.masked.duration,
              delay: reduced ? 0 : index * revealTiming.masked.stagger, ease: easeOutCubic }}
          >{service.title}</motion.span>
        </h3>
        <motion.span className="service-toggle" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.12 }}>
          <Plus size={26} strokeWidth={1.2} aria-hidden="true" />
        </motion.span>
      </summary>
      <LineReveal>{service.description}</LineReveal>
    </details>
  );
}

export function Services() {
  return (
    <section id="services" className="f-sec services-section chapter-section" data-tone="black" aria-labelledby="services-title">
      <div className="f-grid">
        <div className="services-intro">
          <LiquidHeading id="services-title" className="f-title">Services</LiquidHeading>
          {portfolio.servicesArePlaceholders && <p className="section-note">Service list to be confirmed.</p>}
        </div>
        <div className="services-list">
          {portfolio.services.map((service, index) => <ServiceRow key={service.title} service={service} index={index} />)}
        </div>
      </div>
    </section>
  );
}
