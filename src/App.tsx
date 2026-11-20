import { lazy, Suspense, useCallback, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { Showreel } from './components/Showreel';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ReferenceBackdrop } from './components/ReferenceBackdrop';
import type { Project } from './types';

const VideoPlayer = lazy(() => import('./components/VideoPlayer'));

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const openPlayer = useCallback((project: Project) => setSelectedProject(project), []);
  const closePlayer = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero onPlay={openPlayer} />
        <ProjectGallery onPlay={openPlayer} playerOpen={selectedProject !== null} />
        <About />
        <Services />
        <Showreel onPlay={openPlayer} />
        <div className="f-kw closing-region">
          <div className="f-kw-bg"><ReferenceBackdrop kind="closing" /></div>
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
      {selectedProject && (
        <Suspense fallback={
          <div className="player-loading" role="status">
            <LoaderCircle className="loading-spinner" size={22} aria-hidden="true" />
            Opening player...
          </div>
        }>
          <VideoPlayer project={selectedProject} onClose={closePlayer} />
        </Suspense>
      )}
    </>
  );
}
