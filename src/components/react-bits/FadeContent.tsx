import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeContent = ({
  children,
  blur = false,
  duration = 1,
  easing = "easeOut",
  threshold = 0.1,
  initialOpacity = 0,
  delay = 0
}: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: threshold, once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const variants = {
    hidden: { opacity: initialOpacity, filter: blur ? "blur(10px)" : "none", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      transition={{ duration, ease: easing, delay: delay / 1000 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;