import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { animate, m as motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { portfolio, mediaUrl } from '../data/content';
import editorLogo from '../../reference/images/editor-logo.svg';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const headerY = useMotionValue(0);
  const hidden = useRef(false);
  const lastScroll = useRef(0);
  const motionControl = useRef<{ stop: () => void } | null>(null);
  const heroBottom = useRef(750);

  function showHeader(hide: boolean) {
    if (hide === hidden.current) return;
    hidden.current = hide;
    headerRef.current?.classList.toggle('is-hidden', hide);
    motionControl.current?.stop();
    motionControl.current = animate(headerY, hide ? -96 : 0, { duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' });
  }

  function updateTone(position: number) {
    const header = headerRef.current;
    if (!header) return;
    header.classList.toggle('is-solid', position >= heroBottom.current - 96);
  }

  useMotionValueEvent(scrollY, 'change', position => {
    updateTone(position);
    if (reducedMotion || menuOpen || position <= 80) {
      showHeader(false);
      lastScroll.current = position;
      return;
    }
    const distance = position - lastScroll.current;
    if (distance >= 4) {
      showHeader(true);
      lastScroll.current = position;
    } else if (distance <= -24) {
      showHeader(false);
      lastScroll.current = position;
    }
  });

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const measure = () => {
      heroBottom.current = document.getElementById('hero')?.offsetHeight || 750;
      updateTone(scrollY.get());
    };
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    measure();
    return () => { observer.disconnect(); motionControl.current?.stop(); };
  }, [scrollY]);

  useEffect(() => {
    if (reducedMotion || menuOpen) showHeader(false);
  }, [reducedMotion, menuOpen]);

  useEffect(() => {
    if (!menuOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header className="topbar site-header" ref={headerRef} style={{ y: headerY }} onFocusCapture={() => showHeader(false)}>
        <div className="header-inner container">
          <a className="topbar__logo brand" href="#hero" aria-label={portfolio.identity.name + ', home'}>
            <img src={portfolio.identity.logo ? mediaUrl(portfolio.identity.logo) : editorLogo} alt={portfolio.identity.name} width={110} height={50} />
          </a>
          <nav className="topbar__nav desktop-nav" aria-label="Primary navigation">
            {links.map(link => (
              <a key={link.href} className={'f-u' + (link.label === 'Contact' ? ' nav-contact' : '')} href={link.href}>
                <span className="f-nav__in">{link.label}</span>
              </a>
            ))}
          </nav>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-controls="mobile-navigation"
          >
            Menu <Menu size={21} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </motion.header>
      {menuOpen && (
        <dialog
          className="mobile-menu"
          id="mobile-navigation"
          aria-label="Navigation"
          ref={dialogRef}
          onCancel={event => { event.preventDefault(); setMenuOpen(false); }}
        >
          <div className="mobile-menu-header">
            <span className="brand-name">{portfolio.identity.name}</span>
            <button className="icon-button" aria-label="Close navigation" autoFocus onClick={() => setMenuOpen(false)}>
              <X size={26} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {link.label}<ArrowUpRight size={34} strokeWidth={1.2} aria-hidden="true" />
              </motion.a>
            ))}
          </nav>
          <p className="mobile-menu-footer">{portfolio.identity.role}</p>
        </dialog>
      )}
    </>
  );
}
