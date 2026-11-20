import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig } from 'motion/react';
import App from './App';
import './styles.css';

const container = document.getElementById('root')!;
const application = (
  <StrictMode>
    <LazyMotion features={() => import('./motionFeatures').then(module => module.default)} strict>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
    </LazyMotion>
  </StrictMode>
);
if (container.hasChildNodes()) hydrateRoot(container, application);
else createRoot(container).render(application);
