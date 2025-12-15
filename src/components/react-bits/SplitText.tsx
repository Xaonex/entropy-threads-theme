import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; y: number };
  animationTo?: { opacity: number; y: number };
  splitBy?: 'char' | 'word' | 'line';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0.05,
  animationFrom = { opacity: 0, y: 20 },
  animationTo = { opacity: 1, y: 0 },
  splitBy = 'char',
}) => {
  const words = text.split(' ');
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    hidden: animationFrom,
    visible: {
      ...animationTo,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (splitBy === 'word') {
    return (
      <motion.div
        className={`flex flex-wrap ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};