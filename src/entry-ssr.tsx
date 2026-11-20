import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'motion/react';
import App from './App';

export function render() {
  return renderToString(<MotionConfig reducedMotion="user"><App /></MotionConfig>);
}
