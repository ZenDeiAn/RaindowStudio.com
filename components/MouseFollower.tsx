
import React, { useEffect, useRef } from 'react';

const MouseFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Direct DOM update in the event listener for minimum latency
    const mouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Size is 24px (w-6), offset by 12px to center perfectly
        const x = e.clientX - 12;
        const y = e.clientY - 12;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference will-change-transform"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)',
        backgroundSize: '400%',
        animation: 'spin 3s linear infinite, rainbow 5s ease infinite',
        // Create ring effect by masking the center
        maskImage: 'radial-gradient(transparent 55%, black 60%)',
        WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)'
      }}
    />
  );
};

export default MouseFollower;
