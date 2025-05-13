// In your TextAnimations/SplitText/Typewriter.jsx file:
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Typewriter = forwardRef(({
  text = "This is a simple typewriter effect component. It types out text character by character with a blinking cursor.",
  speed = 50,
  active = false,
  onComplete = () => {},
  className = "",
  cursorClassName = "",
  cursorStyle = "default", // new prop for cursor style options
}, ref) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef(null);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    restart: () => {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
    },
    getStatus: () => ({
      isComplete,
      currentIndex,
      totalLength: text.length
    })
  }));

  // Watch for active prop changes
  useEffect(() => {
    // Reset if active becomes true and was previously completed
    if (active && isComplete) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [active, isComplete]);

  // Type characters one by one when active
  useEffect(() => {
    if (!active) return;
    
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeoutRef.current);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [active, currentIndex, text, speed, onComplete, isComplete]);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Determine cursor element based on style
  const getCursorElement = () => {
    const baseClass = `ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} ${cursorClassName}`;
    
    switch(cursorStyle) {
      case 'underscore':
        return <span className={`inline-block w-4 h-1 bg-black ${baseClass}`}></span>;
      case 'block':
        return <span className={`inline-block w-2 h-5 bg-black ${baseClass}`}></span>;
      case 'default':
      default:
        return <span className={`inline-block w-2 h-4 bg-black ${baseClass}`}></span>;
    }
  };

  return (
    <span className={className}>
      <span className="typewriter-text">{displayText}</span>
      {getCursorElement()}
    </span>
  );
});

export default Typewriter;