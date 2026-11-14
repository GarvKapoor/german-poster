import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [tiltAngle, setTiltAngle] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeoutId: number;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      
      if (Math.abs(diff) > 2) {
        const dir = diff > 0 ? 'down' : 'up';
        setScrollDirection(dir);
        const clampedVel = Math.min(Math.max(diff, -30), 30);
        setScrollVelocity(clampedVel);
        // Subtle tilt angle in degrees: negative when scrolling down, positive when scrolling up
        setTiltAngle(clampedVel * 0.05);
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;

        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          setTiltAngle(0);
          setScrollVelocity(0);
        }, 150);
      }
      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { scrollDirection, scrollY, scrollVelocity, tiltAngle };
}
