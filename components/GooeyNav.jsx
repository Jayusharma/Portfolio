"use client"
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const GooeyNav = ({
  items=[{
    label: "Home",
    href: "/",
  },{
    label: "About",
    href: "#about",
  },{
    label: "Projects",
    href: "#projects",
  },{
    label: "Contact",
    href: "#Contact",
  },],
  containNavOnly = false,
  animationTime = 400,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 200,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const noise = (n = 1) => n / 2 - Math.random() * n;
  
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial state - move navbar above viewport
    gsap.set(containerRef.current, { 
      y: -100, 
      opacity: 0 
    });
    
    // Animate navbar down
    gsap.to(containerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });
  }, []);

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    element.classList.add("showing-background");
    
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // do nothing
          }
        }, t);
      }, 30);
    }
    
    // Remove the background after the longest animation completes
    const longestAnimationTime = animationTime * 2 + timeVariance + 100; // Add a small buffer
    setTimeout(() => {
      if (element) {
        element.classList.remove("showing-background");
      }
    }, longestAnimationTime);
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e, index) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
    // Close mobile menu after click
    setMobileMenuOpen(false);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl }, index);
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    // Only apply gooey effects on desktop
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Hide effect elements on mobile
      if (filterRef.current) filterRef.current.style.display = 'none';
      if (textRef.current) textRef.current.style.display = 'none';
      return;
    } else {
      // Show effect elements on desktop
      if (filterRef.current) filterRef.current.style.display = 'grid';
      if (textRef.current) textRef.current.style.display = 'grid';
    }
    
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    
    const resizeObserver = new ResizeObserver(() => {
      const isMobileNow = window.innerWidth < 768;
      
      // Toggle visibility based on screen size
      if (isMobileNow) {
        if (filterRef.current) filterRef.current.style.display = 'none';
        if (textRef.current) textRef.current.style.display = 'none';
      } else {
        if (filterRef.current) filterRef.current.style.display = 'grid';
        if (textRef.current) textRef.current.style.display = 'grid';
        
        const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
        if (currentActiveLi) {
          updateEffectPosition(currentActiveLi);
        }
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* This effect is quite difficult to recreate faithfully using Tailwind, so a style tag is a necessary workaround */}
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: black;
          }
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
            transition: background 0.3s ease;
            pointer-events: none;
          }
          .effect.filter.showing-background::before {
            background: black;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: none;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            color: black;
            text-shadow: none;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          
          /* Mobile menu styles */
          .hamburger {
            width: 24px;
            height: 18px;
            position: relative;
            cursor: pointer;
            display: none;
          }
          
          @media (max-width: 767px) {
            .hamburger {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            
            .desktop-menu {
              display: none;
            }
          }
          
          @media (min-width: 768px) {
            .mobile-menu {
              display: none !important;
            }
          }
          
          .hamburger span {
            display: block;
            width: 100%;
            height: 2px;
            background-color: white;
            transition: all 0.3s ease;
          }
          
          .hamburger.open span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
          }
          
          .hamburger.open span:nth-child(2) {
            opacity: 0;
          }
          
          .hamburger.open span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
          }
          
          .mobile-menu {
            position: absolute;
            top: 50px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.85);
            border-radius: 6px;
            padding: 0.5rem;
            z-index: 50;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            min-width: 120px;
            display: flex;
            flex-direction: column;
          }
          
          .mobile-menu li {
            margin: 5px 0;
            width: 100%;
            text-align: center;
            padding: 6px 10px;
          }
        `}
      </style>
      <div 
        className={`${containNavOnly ? 'absolute' : 'fixed'} top-0 left-0 ${containNavOnly ? 'w-auto h-auto' : 'w-full '} z-[999] font-chakra tracking-[1.5px] `} 
        ref={containerRef}>
        <nav
          className="flex absolute w-full justify-between z-50 mt-3"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        > 
          <div className="size-[40px] ml-3 pointer-events-auto max-lg:size-[30px]">
            <img src="/logo.png" alt="Logo" />
          </div>
          
          {/* Desktop Menu */}
          <ul
            ref={navRef}
            className="desktop-menu flex gap-12 list-none p-0 px-4 m-0 relative z-[3] mr-10 max-lg:mr-3 max-lg:gap-5 pointer-events-auto"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`py-[0.6em] px-[1em] rounded-full relative duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={(e) => handleClick(e, index)}
              >
                <Link
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Toggle - Fixed the duplicate className issue */}
          <div 
            className={`hamburger mr-5 hidden max-md:flex pointer-events-auto z-[60] ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          {/* Mobile Menu Dropdown - Simplified */}
          {mobileMenuOpen && (
            <ul
              className="mobile-menu list-none m-0 pointer-events-auto"
              style={{
                color: "white",
                textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`relative rounded text-white ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={(e) => handleClick(e, index)}
                >
                  <Link
                    href={item.href}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="outline-none block w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;