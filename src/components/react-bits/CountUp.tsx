import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  decimals?: number; // Not fully implemented in this simple version but good for API
}

const CountUp = ({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  decimals = 0,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  
  // Damping and stiffness for a smooth mechanical feel
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000, 
  });

  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && startWhen) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          parseFloat(latest.toFixed(decimals))
        ).replace(/,/g, separator); // Custom separator replacement if needed, heavily simplified
      }
    });

    return () => springValue.destroy();
  }, [springValue, decimals, separator]);

  return <span className={className} ref={ref} />;
};

export default CountUp;