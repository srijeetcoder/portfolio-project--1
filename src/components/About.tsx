import { UserRound } from 'lucide-react';
import { useRef } from 'react';
import { portfolio, mediaUrl } from '../data/content';
import { Reveal } from './Reveal';
import { LiquidLede } from './LiquidText';
import { LineReveal } from './LineReveal';
import { usePinnedScene } from '../lib/usePinnedScene';

export function About() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scene = usePinnedScene(sceneRef, stageRef, { minimumWidth: 1024, minimumHeight: 720, fitStage: true, arrival: true });
  const tools = portfolio.software.length ? portfolio.software : ['[Editing software]', '[Colour tools]', '[Audio tools]'];
  return (
    <section id="about" className="f-sec f-about chapter-section scroll-scene about-scroll-scene" data-tone="white" aria-labelledby="about-title"
      ref={sceneRef} data-pin-state={scene.mode} style={scene.style}>
      <div className="scene-stage about-story" ref={stageRef}>
      <div className="f-grid">
        <h2 id="about-title" className="sr-only">About me</h2>
        <div className="about-lede-wrap">
          <LiquidLede className="f-lede" text={portfolio.about.biography} progress={scene.enabled ? scene.progress : undefined}>
            <span className="f-w">I'm</span>{' '}<span className="f-w">{portfolio.identity.name}.</span>{' '}
            <span className="f-w f-face" role="img" aria-label={portfolio.about.photograph ? portfolio.identity.name : 'Profile photograph placeholder'}>
              {portfolio.about.photograph
                ? <img className="f-face__img" src={mediaUrl(portfolio.about.photograph)} alt="" loading="lazy" width={120} height={120} />
                : <UserRound size={52} strokeWidth={1.2} aria-hidden="true" />}
            </span>
          </LiquidLede>
          {portfolio.about.isPlaceholder && <p className="placeholder-note">Biography placeholder</p>}
        </div>
        <div className="f-about__body">
          <LineReveal>{portfolio.about.approach}</LineReveal>
          <LineReveal delay={0.08}>{portfolio.about.background}</LineReveal>
        </div>
        <Reveal className="software-section">
          <h3>Software &amp; skills</h3>
          <div className="software-list">{tools.map(tool => <span key={tool}>{tool}</span>)}</div>
          {portfolio.skills.length > 0 && <p className="skills-list">{portfolio.skills.join(' / ')}</p>}
        </Reveal>
      </div>
      {portfolio.experience.length > 0 && (
        <Reveal className="experience-section f-grid">
          <h3 className="f-title">Experience</h3>
          <div className="experience-list">
            {portfolio.experience.map(entry => (
              <article key={entry.company + entry.period + entry.role}>
                <h4>{entry.company}</h4><p>{entry.role}</p><p className="muted">{entry.period}</p>
                {entry.description && <p>{entry.description}</p>}
              </article>
            ))}
          </div>
        </Reveal>
      )}
      {portfolio.clients.length > 0 && (
        <Reveal className="client-section f-grid">
          <div className="client-logos" aria-label="Selected clients">
            {portfolio.clients.map(client => {
              const logo = <img src={mediaUrl(client.logo)} alt={client.name} width={140} height={60} loading="lazy" />;
              return client.url ? <a key={client.name} href={client.url} target="_blank" rel="noreferrer">{logo}</a> : <span key={client.name}>{logo}</span>;
            })}
          </div>
        </Reveal>
      )}
      </div>
    </section>
  );
}
