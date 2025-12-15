import type { FC } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  enableShadows?: boolean;
}

const GlitchText: FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  speed = 1,
  enableShadows = true 
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative inline-block z-10"
        initial={{ skewX: 0 }}
        animate={{ 
          skewX: [0, -2, 2, 0],
          x: [0, -2, 2, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3 / speed, 
          ease: "easeInOut",
          repeatDelay: Math.random() * 5 
        }}
      >
        {text}
      </motion.span>
      {enableShadows && (
        <>
          <motion.span 
            className="absolute top-0 left-0 -z-10 text-signal-red opacity-70"
            animate={{ x: [-2, 2, -2], opacity: [0.7, 0.4, 0.7] }}
            transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
          >
            {text}
          </motion.span>
          <motion.span 
            className="absolute top-0 left-0 -z-10 text-cyan-glitch opacity-70"
            animate={{ x: [2, -2, 2], opacity: [0.7, 0.4, 0.7] }}
            transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror", delay: 0.1 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
};

export default GlitchText;