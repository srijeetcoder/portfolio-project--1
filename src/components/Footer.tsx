import { ArrowUpRight } from 'lucide-react';
import { portfolio, mediaUrl } from '../data/content';
import editorLogo from '../../reference/images/editor-logo.svg';
import { Availability } from './Availability';

const socials = [
  { label: 'Instagram', key: 'instagram' },
  { label: 'YouTube', key: 'youtube' },
  { label: 'WhatsApp', key: 'whatsapp' },
] as const;

export function Footer() {
  const logo = portfolio.identity.logo ? mediaUrl(portfolio.identity.logo) : editorLogo;
  const tools = portfolio.software.length ? portfolio.software : ['[Editing software]', '[Colour tools]', '[Audio tools]'];
  return (
    <footer className="foot site-footer" id="foot">
      <div className="f-foot__col f-foot__contact">
        <p className="f-foot__label">Contact</p>
        <div className="f-foot__cta"><Availability /></div>
        <nav className="f-foot__services" aria-label="Services">
          <p className="f-foot__label">Services</p>
          <ul className="f-foot__list">
            {portfolio.services.map(service => <li key={service.title}><a className="f-foot__link f-u" href="#services">{service.title}</a></li>)}
          </ul>
        </nav>
      </div>
      <nav className="f-foot__col f-foot__social social-links" aria-label="Social contact links">
        <p className="f-foot__label">Social</p>
        <ul className="f-foot__list">
          {socials.map(social => <li key={social.key}>
            {portfolio.contact[social.key]
              ? <a className="f-foot__link f-u" href={portfolio.contact[social.key]} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
              : <span className="f-foot__link social-placeholder" aria-label={social.label + ' link to be added'}>{social.label}<ArrowUpRight size={14} aria-hidden="true" /></span>}
          </li>)}
        </ul>
      </nav>
      <div className="f-now footer-tools">
        <p className="f-foot__label">Software &amp; skills</p>
        <div className="f-now__list">
          {tools.map(tool => <p className="f-now__title" key={tool}>{tool}</p>)}
        </div>
      </div>
      <div className="f-foot__rule" />
      <div className="foot__row">
        <a className="foot__logo" href="#hero" aria-label="Back to top"><img src={logo} alt={portfolio.identity.name} width={274} height={125} /></a>
        <p className="f-foot__where">{portfolio.identity.role}</p>
        <p className="f-foot__copy">&copy; {new Date().getFullYear()} {portfolio.identity.name}</p>
        <div className="f-foot__legal"><a className="f-showall" href="#hero">Back to top<ArrowUpRight size={14} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
