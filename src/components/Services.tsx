import { Plus } from 'lucide-react';
import { portfolio } from '../data/content';
import { Reveal } from './Reveal';
import { LiquidHeading } from './LiquidText';

export function Services() {
  return (
    <section id="services" className="f-sec services-section chapter-section" data-tone="white" aria-labelledby="services-title">
      <div className="f-grid">
        <Reveal className="services-intro">
          <LiquidHeading id="services-title" className="f-title">Services</LiquidHeading>
          {portfolio.servicesArePlaceholders && <p className="section-note">Service list to be confirmed.</p>}
        </Reveal>
        <Reveal className="services-list">
          {portfolio.services.map(service => (
            <details key={service.title} className="service-item">
              <summary><h3>{service.title}</h3><Plus size={26} strokeWidth={1.2} aria-hidden="true" /></summary>
              <p>{service.description}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
