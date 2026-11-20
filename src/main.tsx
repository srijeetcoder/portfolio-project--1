import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App';
import './styles.css';

const container = document.getElementById('root')!;
const application = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);
if (container.hasChildNodes()) hydrateRoot(container, application);
else createRoot(container).render(application);
