import { renderToString } from 'react-dom/server';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import App from './App';

export function render() {
  return renderToString(<LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user"><App /></MotionConfig></LazyMotion>);
}
