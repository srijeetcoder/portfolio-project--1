import { ArrowRight } from 'lucide-react';
import { portfolio } from '../data/content';

export function Contact() {
  const email = portfolio.contact.email;
  return (
    <section id="contact" className="f-sec f-contact contact-section" aria-labelledby="contact-title">
      <div className="f-grid">
        <h2 id="contact-title" className="sr-only">Contact</h2>
        {email
          ? <a className="f-contact__mail f-u contact-email" href={'mailto:' + email}>{email}</a>
          : <span className="f-contact__mail contact-email">[Your email address]</span>}
        <div className="contact-actions f-contact__go">
          {email
            ? <a className="f-showall" href={'mailto:' + email}>Start a project<ArrowRight size={14} aria-hidden="true" /></a>
            : <button className="f-showall" disabled>Contact coming soon<ArrowRight size={14} aria-hidden="true" /></button>}
        </div>
      </div>
    </section>
  );
}
