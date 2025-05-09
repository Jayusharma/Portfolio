"use client"
import React, { useRef, useState, useEffect } from 'react'
import { gsap } from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const projects=[
  {
    image: "data:image/jpeg;base64,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", // Using placeholder images since external URLs might not work
    des: "Project 1"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 2"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 3"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 4"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 5"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 6"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 7"
  },
  {
    image: "/api/placeholder/400/320",
    des: "Project 8"
  },
]

const Show = () => {
  const slideRef = useRef(null);
  const CardRef = useRef([]);
  const [hoverSide, setHoverSide] = useState(0);
  const middleIndex = Math.floor(projects.length / 2);
  const initial = middleIndex + projects.length;
  const [CurrentIndex, setCurrentIndex] = useState(initial);
  const [clicked, setClicked] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandedContent, setExpandedContent] = useState(null);
  const expandedCardRef = useRef(null);
  const containerRef = useRef(null);
  // Store the centered card position for accurate close animation
  const centeredPositionRef = useRef(null);

  const extendedProjects = [
    ...projects,
    ...projects,
    ...projects
  ];

  // Set current index as mid item 
  useEffect(() => {
    const t1 = gsap.timeline();
    const container = slideRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / extendedProjects.length;
    const scrollTod = itemWidth * CurrentIndex - container.clientWidth / 2 + itemWidth / 2;

    t1.to(container, {
      scrollTo: { x: scrollTod },
      duration: 0.6,
      ease: 'power2.inOut',
    });
  }, [CurrentIndex]);
  
  // Scrolling effect 
  useEffect(() => {
    const container = slideRef.current;
    if (!container || hoverSide === 0 || expanded) return;

    let animationFrameId;

    const smoothScroll = () => {
      container.scrollLeft += hoverSide * 10; // Small pixel shift per frame
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll(); // Start scrolling

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on hover exit
  }, [hoverSide, expanded]);

  // Infinite scroll loop 
  useEffect(() => {
    const container = slideRef.current;
    if (!container || expanded) return;

    const itemWidth = container.scrollWidth / extendedProjects.length;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;

      // Temporarily remove smooth scroll for instant jump
      container.classList.remove("scroll-smooth");

      // Jump from left clones to original content
      if (scrollLeft <= itemWidth * (projects.length / 2)) {
        container.scrollLeft += itemWidth * projects.length;
      }

      // Jump from right clones to original content
      if (scrollLeft >= itemWidth * (projects.length + (projects.length / 2))) {
        container.scrollLeft -= itemWidth * projects.length;
      }

      // Restore scroll-smooth in the next frame
      requestAnimationFrame(() => {
        container.classList.add("scroll-smooth");
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [expanded]);

  // Handle card click and expansion
  const handleCardClick = (index, project) => {
    if (expanded) return;
    
    setCurrentIndex(index);
    setClicked(true);
    
    // Get references
    const card = CardRef.current[index];
    const container = containerRef.current;
    const slideContainer = slideRef.current;
    
    if (card && container && slideContainer) {
      // Store expanded content
      setExpandedContent(project);
      
      // First, scroll to center the clicked card
      const itemWidth = slideContainer.scrollWidth / extendedProjects.length;
      const scrollTod = itemWidth * index - slideContainer.clientWidth / 2 + itemWidth / 2;
      
      // Create timeline for the complete animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          setExpanded(true);
        }
      });
      
      // Step 1: Center the card
      tl.to(slideContainer, {
        scrollTo: { x: scrollTod },
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          // After card is centered, now we can get accurate position for expansion
          const cardRect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Store the centered position for use during close animation
          centeredPositionRef.current = {
            top: cardRect.top - containerRect.top,
            left: cardRect.left - containerRect.left,
            width: cardRect.width,
            height: cardRect.height
          };
          
          // Step 2: Create clone for expansion only after centering is done
          const clone = card.cloneNode(true);
          clone.style.position = "absolute";
          clone.style.top = `${centeredPositionRef.current.top}px`;
          clone.style.left = `${centeredPositionRef.current.left}px`;
          clone.style.width = `${centeredPositionRef.current.width}px`;
          clone.style.height = `${centeredPositionRef.current.height}px`;
          clone.style.zIndex = "50";
          clone.style.borderRadius = "0px"; // Match original card
          expandedCardRef.current = clone;
          container.appendChild(clone);
          
          // Disable scroll during expansion
          setScrollEnabled(false);
          
          // Step 3: Animate other cards to slide out with staggered delay
          const slideTl = gsap.timeline();
          
          CardRef.current.forEach((otherCard, i) => {
            if (i !== index) {
              const direction = i < index ? -1 : 1;
              // Calculate distance based on position from clicked card
              const distance = Math.abs(i - index);
              // Create staggered delay based on distance from clicked card
              const staggerDelay = distance * 0.05;
              
              slideTl.to(otherCard, {
                x: `${direction * (window.innerWidth * 0.5)}px`, // Not too far off screen
                opacity: 0,
                duration: 0.8, // Slower slide animation
                ease: "power3.out", // Smoother easing
                delay: staggerDelay
              }, 0); // Start at the same time, but with staggered delays
            }
          });
          
          // Step 4: Only start expanding the clone after cards have started sliding
          slideTl.to(clone, {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 1.2,
            ease: "power2.inOut",
            delay: 0.3, // Start expanding after slide animation has begun
            onComplete: () => {
              // Add expanded content
              const contentDiv = document.createElement('div');
              contentDiv.className = "absolute inset-0 bg-white p-8 overflow-auto opacity-0"; // Start invisible
              contentDiv.innerHTML = `
                <h1 class="text-4xl font-bold mb-4">${project.des}</h1>
                <p class="text-lg mb-4">Expanded content for ${project.des}</p>
                <button id="close-btn" class="px-4 py-2 bg-black text-white rounded">Close</button>
              `;
              clone.appendChild(contentDiv);
              
              // Fade in content
              gsap.to(contentDiv, {
                opacity: 1,
                duration: 0.5,
                delay: 0.2
              });
              
              document.getElementById('close-btn').addEventListener('click', handleClose);
            }
          }, 0.2); // Start slightly after the sliding animation begins
        }
      });
    }
  };
  
  // Handle closing the expanded card
  const handleClose = () => {
    const container = containerRef.current;
    const clone = expandedCardRef.current;
    const storedPosition = centeredPositionRef.current;
  
    if (clone && storedPosition) {
      // Set transform-origin to center for a consistent animation
      clone.style.transformOrigin = "center center";
  
      // Create reverse animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Remove the clone and reset states after the animation
          if (clone.parentNode) {
            container.removeChild(clone);
          }
          setScrollEnabled(true);
          setExpanded(false);
          setExpandedContent(null);
          centeredPositionRef.current = null;
        },
      });
  
      // Step 1: Fade out the expanded content
      const contentDiv = clone.querySelector('div');
      if (contentDiv) {
        tl.to(contentDiv, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (contentDiv.parentNode) {
              clone.removeChild(contentDiv);
            }
          },
        });
      }
  
      // Step 2: Shrink the clone back to the original CENTERED position
      tl.to(
        clone,
        {
          // Use the stored centered position from when the card was expanded
          top: `${storedPosition.top}px`,
          left: `${storedPosition.left}px`,
          width: `${storedPosition.width}px`,
          height: `${storedPosition.height}px`,
          borderRadius: "0px",
          scale: 1, // Reset scale
          duration: 1.0,
          ease: "power2.inOut",
        },
        0 // Start at the same time as other animations
      );
  
      // Step 3: Reset other cards to their original positions and opacity
      CardRef.current.forEach((otherCard) => {
        if (otherCard) {
          tl.to(
            otherCard,
            {
              x: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
            },
            0 // Start at the same time as the clone shrinking
          );
        }
      });
    }
  };
  return (
    <>
    <style>
      {`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>
    <div className='h-auto w-auto relative top-[35vh]'>
      <div className='w-[100%]  relative text-center font-Theatre'>
        <h1 className='text-5xl '>Projects Showcase</h1>
      </div>
      
      <div
        ref={containerRef}
        className="h-[60vh] w-[84vw] mt-[7%] ml-[9%] relative  overflow-hidden"
        style={{ clipPath: 'url(#custom-clip)' }}
      >
        <div
          ref={slideRef}
          className={`h-full w-full flex gap-3 hide-scrollbar ${
            scrollEnabled ? "scroll-smooth" : ""
          }`}
          style={{
            overflowX: scrollEnabled ? 'scroll' : 'hidden'
          }}
        >
          {extendedProjects.map((project, index) => (
            <div 
              ref={(el) => (CardRef.current[index] = el)}
              key={index} 
              onClick={() => handleCardClick(index, project)}
              className={`h-full w-[13vw] flex-shrink-0 relative flex items-center justify-center text-black
                ${index === CurrentIndex ? "bg-white" : "bg-white"}
                transition-transform duration-300 cursor-pointer
              `}
              style={{ transformOrigin: 'center center' }}
            >
              {/* Fixed: Changed project.img to project.image */}
              <img 
                src={project.image} 
                alt={project.des}
                className='w-full h-full object-cover' 
              />
              <div className="absolute w-35 h-22  top-1/2 left-0 z-[999]  leading-[30px] text-white  " >
              <h1 className='leading-[28px]'>{project.des}</h1>
              
               </div>
            </div>
          ))}
        </div>
        
        {!expanded && (
          <>
            <div 
              className='h-full w-[2vw] absolute top-0 left-0 z-10'
              onMouseEnter={() => setHoverSide(-1)}
              onMouseLeave={() => setHoverSide(0)}
            ></div>
            <div 
              className='h-full w-[2vw] absolute top-0 right-0 z-10'
              onMouseEnter={() => setHoverSide(1)}
              onMouseLeave={() => setHoverSide(0)}
            ></div>
          </>
        )}
      </div>

      <svg width="0" height="0">
        <defs>
          <clipPath id="custom-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0,0 
              C 0.25,0.15, 0.75,0.15, 1,0 
              L 1,1 
              C 0.75,0.85, 0.25,0.85, 0,1 
              Z
            " />
          </clipPath>
        </defs>
      </svg>
    </div>
    </>
  )
}

export default Show;