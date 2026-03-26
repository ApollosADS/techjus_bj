import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Décalage avant déclenchement (px) */
  rootMargin?: string;
}

/**
 * Apparition légère au scroll (opacité + léger translateY).
 * Respecte prefers-reduced-motion.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  rootMargin = '0px 0px -48px 0px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, rootMargin]);

  const shown = visible || reducedMotion;

  return (
    <div
      ref={ref}
      className={cn(
        'will-change-[opacity,transform] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out',
        shown
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
