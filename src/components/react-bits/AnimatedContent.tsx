import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedContentProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  easing?: any;
  threshold?: number;
  className?: string;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  easing = [0.17, 0.55, 0.55, 1],
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slideUp' ? 20 : animation === 'slideDown' ? -20 : 0,
      x: animation === 'slideLeft' ? 20 : animation === 'slideRight' ? -20 : 0,
      scale: animation === 'scaleIn' ? 0.9 : 1,
      rotate: animation === 'rotateIn' ? -10 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};