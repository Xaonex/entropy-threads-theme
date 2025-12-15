import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  parallaxClassName?: string;
  scrollerClassName?: string;
}

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

function VelocityText({ children, baseVelocity = 100, className = '' }: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap flex-nowrap">
      <motion.div className={`flex flex-nowrap ${className}`} style={{ x }}>
        <span ref={copyRef} className="mr-4 flex">{children}</span>
        <span className="mr-4 flex">{children}</span>
        <span className="mr-4 flex">{children}</span>
        <span className="mr-4 flex">{children}</span>
      </motion.div>
    </div>
  );
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 5,
  className = '',
}) => {
  return (
    <section className="w-full overflow-hidden">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;