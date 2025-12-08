import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useApp } from '../App';
import { TAGS, MOTTOS } from '../constants';

// Advanced Typewriter Component
const MottoRotator = ({ mottos }: { mottos: string[] }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % mottos.length;
      const fullText = mottos[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      let typeSpeed = 100;
      if (isDeleting) typeSpeed = 50;

      if (!isDeleting && text === fullText) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      setTypingSpeed(typeSpeed);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, mottos, typingSpeed]);

  return (
    <span className="inline-block min-h-[1.5em] text-center w-full">
      {text}
      <span className="animate-pulse ml-1 text-primary">|</span>
    </span>
  );
};

// 3D Tilt Logo Component with Click Animation
const TiltLogo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState<{id: number}[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Trigger Ripple
    const newRipple = { id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Reset animation state after sequence
    setTimeout(() => {
      setIsAnimating(false);
      setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="relative mb-8 flex justify-center items-center">
       {/* Ripple Container - Behind the logo */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ width: '300px', height: '300px', opacity: 0.8, borderWidth: '2px' }}
              animate={{ width: '1000px', height: '1000px', opacity: 0, borderWidth: '1px' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="rounded-full border-primary absolute"
              style={{ borderColor: '#6366f1' }}
            />
          ))}
         </AnimatePresence>
       </div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={isAnimating ? {
          scale: [1, 1.2, 1], // Amplify then return
          x: [0, 0, -5, 5, -3, 3, 0], // Vibrate on landing
        } : {}}
        transition={isAnimating ? {
          duration: 0.6,
          times: [0, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
          ease: "easeInOut"
        } : {}}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative cursor-pointer group z-10"
      >
         {/* Holographic/Rainbow Glow Background */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
          style={{
            background: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            transform: 'translateZ(-20px)'
          }}
        />

        {/* Main Logo Container */}
        <div 
          className="relative bg-white/10 "
          style={{ transform: "translateZ(20px)" }}
        >
          {!imageError ? (
            <img 
              src="/resources/Logo_WithoutGames.png" 
              alt="Raindow Studio" 
              className="h-50 md:h-50 w-auto object-contain drop-shadow-2xl filter" 
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Raindow Studio
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { language } = useApp();
  const mottos = MOTTOS[language];
  const tags = TAGS;
  
  const floatingTags = useMemo(() => {
    return tags.map((tag, i) => ({
      src: tag.src,
      alt: tag.alt,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      moveX: (Math.random() - 0.5) * 150,
      moveY: Math.random() * -200,
      left: Math.random() * 90 + '%',
      top: Math.random() * 90 + '%'
    }));
  }, [tags]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300 perspective-1000">
      
      {/* Animated Background with Blurry Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/20 z-10 backdrop-blur-[1px]" />
        
        {/* Large Gradient Orb 1 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
        
        {/* Large Gradient Orb 2 */}
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Center Accent Orb */}
        <motion.div
          animate={{
             x: [0, 50, -50, 0],
             y: [0, 50, 50, 0],
             opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-pink-500/10 rounded-full blur-[100px] mix-blend-overlay"
        />
      </div>

      {/* Floating Tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingTags.map((tag, i) => (
          <motion.img
            key={i}
            src={tag.src}
            alt={tag.alt}
            className="absolute opacity-60 dark:opacity-50"
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0 
            }}
            animate={{ 
              y: [0, tag.moveY],
              x: [0, tag.moveX],
              opacity: [0.3, 0.8, 0.3] 
            }}
            transition={{ 
              duration: tag.duration, 
              repeat: Infinity,
              ease: "linear",
              delay: tag.delay
            }}
            style={{
              left: tag.left,
              top: tag.top,
              height: '35px' // Consistent height for badges
            }}
          />
        ))}
      </div>

      <div className="z-10 flex flex-col items-center px-4 relative">
        <TiltLogo />
        
        <div className="h-24 flex justify-center items-start text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
           <MottoRotator mottos={mottos} />
        </div>
      </div>

      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-10 z-10 transition-all text-primary dark:text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown size={48} />
      </motion.button>
    </section>
  );
};

export default Hero;