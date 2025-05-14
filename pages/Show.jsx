"use client"
import { useRef, useState, useEffect, useCallback, memo } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

gsap.registerPlugin(ScrollToPlugin)

// Memoized Project Card Component
const ProjectCard = memo(({ project, index, currentIndex, activeHover, onCardClick, onCardHover, cardRef }) => {
  // Lazy loading implementation with react-intersection-observer
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px",
  })

  // Combine refs (intersection observer ref and the card ref from parent)
  const setRefs = useCallback(
    (node) => {
      // Save to the ref from parent component
      cardRef(node, index)
      // Save to the inView ref
      inViewRef(node)
    },
    [cardRef, index, inViewRef],
  )

  // Calculate how far the card is from the current center
  const isActive = activeHover === index
  const [imageLoaded, setImageLoaded] = useState(false)

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      ref={setRefs}
      onClick={() => onCardClick(index, project)}
      onMouseEnter={() => onCardHover(index, true)}
      onMouseLeave={() => onCardHover(index, false)}
      className={`card-container h-full w-[25vw] flex-shrink-0 relative flex items-center justify-center overflow-hidden rounded-xl shadow-xl max-sm:w-[30vw]
        ${index === currentIndex ? "z-10" : ""}
        transition-all duration-500 cursor-pointer
      `}
      style={{
        transformOrigin: "center center",
        boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 25px rgba(0,0,0,0.2)",
        transform: isActive ? "translateY(-12px) scale(1.03)" : "",
        border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="card-overlay absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{ opacity: isActive ? 0.3 : 0.5 }}
      />

      {/* Placeholder shown while image is loading */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Only load image when in viewport or nearby (lazy loading) */}
      {inView && (
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.des}
          className={`card-image w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}

      <div className="card-content absolute bottom-0 left-0 w-full p-5 z-10 max-sm:p-1">
        <span className="category-badge text-sm max-sm:text-xs text-white opacity-90 mb-2 inline-block py-1 px-3 rounded-full">
          {project.category}
        </span>
        <h2 className="text-2xl max-sm:text-lg pl-2 font-semibold text-white">{project.des}</h2>

        <div
          className={`mt-3 flex items-center transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-white/80 text-sm">View Project</span>
          <svg
            className="w-4 h-4 ml-2 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  )
})

// Ensure displayName is set for React DevTools
ProjectCard.displayName = "ProjectCard"

const projects = [
  {
    image: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 1",
    category: "Web Development",
  },
  {
    image:
      "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 2",
    category: "UI/UX Design",
  },
  {
    image: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 3",
    category: "Mobile App",
  },
  {
    image: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 4",
    category: "Branding",
  },
  {
    image: "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 5",
    category: "Photography",
  },
  {
    image: "https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 6",
    category: "Motion Design",
  },
  {
    image: "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=600",
    des: "Project 7",
    category: "3D Modeling",
  },
]

const PremiumGallery = () => {
  const slideRef = useRef(null)
  const CardRef = useRef([])
  const [hoverSide, setHoverSide] = useState(0)
  const middleIndex = Math.floor(projects.length / 2)
  const initial = middleIndex + projects.length
  const [CurrentIndex, setCurrentIndex] = useState(initial)
  const [clicked, setClicked] = useState(false)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [expandedContent, setExpandedContent] = useState(null)
  const expandedCardRef = useRef(null)
  const imageCloneRef = useRef(null)
  const containerRef = useRef(null)
  const centeredPositionRef = useRef(null)
  const [activeHover, setActiveHover] = useState(null)
  const contentContainerRef = useRef(null)

  const extendedProjects = [...projects, ...projects, ...projects]

  // Memoized throttle function to prevent unnecessary recreations
  const throttle = useCallback((fn, delay) => {
    let lastCall = 0
    return (...args) => {
      const now = new Date().getTime()
      if (now - lastCall < delay) return
      lastCall = now
      return fn(...args)
    }
  }, [])

  // Set current index as mid item
  useEffect(() => {
    const t1 = gsap.timeline()
    const container = slideRef.current
    if (!container) return

    const itemWidth = container.scrollWidth / extendedProjects.length
    const scrollTod = itemWidth * CurrentIndex - container.clientWidth / 2 + itemWidth / 2

    t1.to(container, {
      scrollTo: { x: scrollTod },
      duration: 0.6,
      ease: "power2.inOut",
    })
  }, [CurrentIndex, extendedProjects.length])

  // Scrolling effect - memoized with dependencies
  useEffect(() => {
    const container = slideRef.current
    if (!container || hoverSide === 0 || expanded) return

    let animationFrameId

    const smoothScroll = () => {
      container.scrollLeft += hoverSide * 10
      animationFrameId = requestAnimationFrame(smoothScroll)
    }

    smoothScroll()

    return () => cancelAnimationFrame(animationFrameId)
  }, [hoverSide, expanded])

  // Infinite scroll loop - memoized with dependencies
  useEffect(() => {
    const container = slideRef.current
    if (!container || expanded) return

    const itemWidth = container.scrollWidth / extendedProjects.length

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft

      container.classList.remove("scroll-smooth")

      if (scrollLeft <= itemWidth * (projects.length / 2)) {
        container.scrollLeft += itemWidth * projects.length
      }

      if (scrollLeft >= itemWidth * (projects.length + projects.length / 2)) {
        container.scrollLeft -= itemWidth * projects.length
      }

      requestAnimationFrame(() => {
        container.classList.add("scroll-smooth")
      })
    }

    // Use memoized throttle function
    const throttledHandleScroll = throttle(handleScroll, 100)
    container.addEventListener("scroll", throttledHandleScroll)

    // Proper cleanup
    return () => container.removeEventListener("scroll", throttledHandleScroll)
  }, [expanded, projects.length, extendedProjects.length, throttle])

  // Memoized card click handler
  const handleCardClick = useCallback(
    (index, project) => {
      if (expanded) return

      setCurrentIndex(index)
      setClicked(true)

      const card = CardRef.current[index]
      const container = containerRef.current
      const slideContainer = slideRef.current
      const isSmallScreen = window.matchMedia("(max-width: 640px)").matches
      const isTablet = window.matchMedia("(max-width: 1024px)").matches

      if (card && container && slideContainer) {
        setExpandedContent(project)

        const itemWidth = slideContainer.scrollWidth / extendedProjects.length
        const scrollTod = itemWidth * index - slideContainer.clientWidth / 2 + itemWidth / 2

        const tl = gsap.timeline({
          onComplete: () => {
            setExpanded(true)
          },
        })

        // Center the card
        tl.to(slideContainer, {
          scrollTo: { x: scrollTod },
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            const cardRect = card.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()

            // Find the image element in the original card
            const originalImage = card.querySelector("img")
            const originalImageRect = originalImage.getBoundingClientRect()

            // Save positions for later use
            centeredPositionRef.current = {
              top: cardRect.top - containerRect.top,
              left: cardRect.left - containerRect.left,
              width: cardRect.width,
              height: cardRect.height,
              imageTop: originalImageRect.top - containerRect.top,
              imageLeft: originalImageRect.left - containerRect.left,
              imageWidth: originalImageRect.width,
              imageHeight: originalImageRect.height,
              imageSrc: originalImage.src,
            }

            // Create a clone of the card as a container (without the image)
            const cardClone = document.createElement("div")
            cardClone.className = "absolute z-50 overflow-hidden rounded-lg"
            cardClone.style.top = `${centeredPositionRef.current.top}px`
            cardClone.style.left = `${centeredPositionRef.current.left}px`
            cardClone.style.width = `${centeredPositionRef.current.width}px`
            cardClone.style.height = `${centeredPositionRef.current.height}px`
            cardClone.style.backgroundColor = "#01090f"
            expandedCardRef.current = cardClone

            // Create a separate clone for just the image
            const imageClone = document.createElement("img")
            imageClone.src = centeredPositionRef.current.imageSrc
            imageClone.className = "object-cover block z-51"
            imageClone.style.top = `${centeredPositionRef.current.imageTop - centeredPositionRef.current.top}px`
            imageClone.style.left = `${centeredPositionRef.current.imageLeft - centeredPositionRef.current.left}px`
            imageClone.style.width = `${centeredPositionRef.current.imageWidth}px`
            imageClone.style.height = `${centeredPositionRef.current.imageHeight}px`
            imageCloneRef.current = imageClone

            // Add the image clone to the container
            cardClone.appendChild(imageClone)
            container.appendChild(cardClone)

            setScrollEnabled(false)

            let finalImageTop, finalImageLeft, finalImageWidth, finalImageHeight

            if (isSmallScreen) {
              // Mobile layout (top image taking full width)
              finalImageTop = 30
              finalImageLeft = 10
              finalImageWidth = window.innerWidth - 80 // Full width minus margin
              finalImageHeight = finalImageWidth * 0.5 // Maintain aspect ratio
            } else if (isTablet) {
              // Tablet layout
              finalImageTop = 170
              finalImageLeft = 80
              finalImageWidth = Math.min(window.innerWidth * 0.26, 500)
              finalImageHeight =
                finalImageWidth * (centeredPositionRef.current.imageHeight / centeredPositionRef.current.imageWidth)
            } else {
              // Desktop layout
              finalImageTop = 200
              finalImageLeft = 100
              finalImageWidth = Math.min(window.innerWidth * 0.26, 500)
              finalImageHeight =
                finalImageWidth * (centeredPositionRef.current.imageHeight / centeredPositionRef.current.imageWidth)
            }

            const cloneHeight = isSmallScreen ? "100vh" : "80vh"

            // Animate other cards with staggered effect
            const slideTl = gsap.timeline()

            CardRef.current.forEach((otherCard, i) => {
              if (i !== index) {
                const direction = i < index ? -1 : 1
                const distance = Math.abs(i - index)
                const staggerDelay = distance * 0.05

                slideTl.to(
                  otherCard,
                  {
                    x: `${direction * (window.innerWidth * 0.5)}px`,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: staggerDelay,
                  },
                  0,
                )
              }
            })

            // First expand just the card container
            slideTl.to(
              cardClone,
              {
                top: -10,
                left: 0,
                width: "100vw",
                height: cloneHeight,
                borderRadius: 0,
                duration: 1.2,
                ease: "power2.inOut",
                delay: 0.3,
              },
              0,
            )

            // Simultaneously animate the image to its final position
            slideTl.to(
              imageClone,
              {
                top: finalImageTop,
                left: finalImageLeft,
                width: finalImageWidth,
                height: finalImageHeight,
                position: "absolute",
                duration: 1.2,
                ease: "power2.inOut",
                delay: 0.3,
                onComplete: () => {
                  // Create and append content once animations are complete
                  const contentDiv = document.createElement("div")

                  if (isSmallScreen) {
                    contentDiv.className =
                      "absolute inset-0 bg-gradient-to-br from-gray-900/95 to-black/95 p-4 opacity-0"
                  } else {
                    contentDiv.className =
                      "absolute inset-0 bg-gradient-to-br from-[#13011c]/90  to-black p-12 opacity-0"
                  }

                  contentDiv.style.overflowY = "hidden"
                  contentDiv.style.overflowX = "hidden"

                  // Store reference to content container
                  contentContainerRef.current = contentDiv

                  let contentHTML

                  if (isSmallScreen) {
                    // Mobile layout - image at top, content below
                    contentHTML = `<div class="expanded-content-wrapper relative"
                style="margin-top: ${finalImageTop + finalImageHeight + 20}px;">
                <div class="flex justify-between items-center">
                 <div> <span class="inline-block text-sm py-1 px-3 mb-2 bg-white/10 text-white rounded-full backdrop-blur-sm">${project.category}</span>
                  <h1 class="text-3xl font-bold mb-3 text-white">${project.des}</h1>
                  </div>
                  <button id="close-btn" class="text-sm  py-1 max-h-10 px-1  bg-white text-black rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                  Close Project
                </button>
                </div>
                </div>
                <div class="content-section w-full text-white mt-4">
                  <p class="text-lg mb-4 text-white/90">Detailed description for ${project.des}. This premium showcase highlights the key features and unique aspects of this project.</p>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                      <h3 class="text-white text-lg font-semibold mb-1">Client</h3>
                      <p class="text-white/80">Premium Client</p>
                    </div>
                    <div class="bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                      <h3 class="text-white text-lg font-semibold mb-1">Timeline</h3>
                      <p class="text-white/80">2024</p>
                    </div>
                    <div class="bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                      <h3 class="text-white text-lg font-semibold mb-1">Category</h3>
                      <p class="text-white/80">${project.category}</p>
                    </div>
                    <div class="bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                      <h3 class="text-white text-lg font-semibold mb-1">Team</h3>
                      <p class="text-white/80">Design & Development</p>
                    </div>
                  </div>
                  <p class="text-lg mb-4 text-white/90">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                    Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                  </p>
                  <p class="text-lg mb-4 text-white/90">
                    Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
                  </p>
                </div>
                <button id="close-btn" class="text-sm mt-4 px-4 py-2.5 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                  Close Project
                </button>
              </div>
            `
                  } else {
                    // Add HTML content with spacing for the image
                    contentHTML = `
                  <div class="expanded-content-wrapper relative min-w-5xl px-12 flex max-sm:flex-col gap-8 mb-8">
                    <div class="relative image-section">
                      <span class="inline-block px-4 py-1.5 text-sm bg-white/10 text-white rounded-full mb-4 backdrop-blur-sm">${project.category}</span>
                      <h1 class="text-5xl font-bold mb-6 text-white">${project.des}</h1>
                      
                      <!-- Transparent placeholder div that matches image dimensions -->
                      <div class="image-placeholder" style="width:${finalImageWidth}px; height:${finalImageHeight}px; top:${finalImageTop}px; left:${finalImageLeft}px top:${finalImageTop}px;"></div>
                      <button id="close-btn" class="text-xl mt-25 px-6 py-3 max-lg:mt-10 max-lg:text-sm bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                        Close Project
                      </button>
                    </div>
                    <div class="content-section w-full text-white mt-[8rem] max-lg:mt-[2rem]">
                      <p class="text-lg mb-6 text-white/90">Detailed description for ${project.des}. This premium showcase highlights the key features and unique aspects of this project.</p>
                      <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                          <h3 class="text-white text-lg font-semibold mb-2">Client</h3>
                          <p class="text-white/80">Premium Client</p>
                        </div>
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                          <h3 class="text-white text-lg font-semibold mb-2">Timeline</h3>
                          <p class="text-white/80">2024</p>
                        </div>
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                          <h3 class="text-white text-lg font-semibold mb-2">Category</h3>
                          <p class="text-white/80">${project.category}</p>
                        </div>
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                          <h3 class="text-white text-lg font-semibold mb-2">Team</h3>
                          <p class="text-white/80">Design & Development</p>
                        </div>
                      </div>
                      <p class="text-lg mb-6 text-white/90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                        Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                      </p>
                      <p class="text-lg mb-6 text-white/90">
                        Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
                      </p>
                    </div>
                  </div>
                `
                  }
                  contentDiv.innerHTML = contentHTML

                  // Put the content behind the image in z-index
                  contentDiv.style.zIndex = "49"
                  cardClone.appendChild(contentDiv)

                  // Fade in content
                  gsap.to(contentDiv, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.2,
                  })

                  document.getElementById("close-btn").addEventListener("click", handleClose)
                },
              },
              0,
            )
          },
        })
      }
    },
    [expanded, extendedProjects.length],
  )

  // Memoized close handler
  const handleClose = useCallback(() => {
    const container = containerRef.current
    const cardClone = expandedCardRef.current
    const imageClone = imageCloneRef.current
    const storedPosition = centeredPositionRef.current
    const contentDiv = contentContainerRef.current

    if (cardClone && imageClone && storedPosition) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (cardClone.parentNode) {
            container.removeChild(cardClone)
          }
          setScrollEnabled(true)
          setExpanded(false)
          setExpandedContent(null)
          centeredPositionRef.current = null
          contentContainerRef.current = null
        },
      })

      // Fade out content
      if (contentDiv) {
        tl.to(contentDiv, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (contentDiv.parentNode) {
              // Remove scroll listener before removing content
              contentDiv.removeEventListener("scroll", () => {})
              cardClone.removeChild(contentDiv)
            }
          },
        })
      }

      // Reset image to absolute positioning
      imageClone.style.position = "absolute"

      // Animate image back to original position
      tl.to(
        imageClone,
        {
          top: storedPosition.imageTop - storedPosition.top,
          left: storedPosition.imageLeft - storedPosition.left,
          width: storedPosition.imageWidth,
          height: storedPosition.imageHeight,
          duration: 1.0,
          ease: "power2.inOut",
        },
        0,
      )

      // Shrink card container back to original position
      tl.to(
        cardClone,
        {
          top: `${storedPosition.top}px`,
          left: `${storedPosition.left}px`,
          width: `${storedPosition.width}px`,
          height: `${storedPosition.height}px`,
          borderRadius: "12px",
          duration: 1.0,
          ease: "power2.inOut",
        },
        0,
      )

      // Reset other cards
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
            0,
          )
        }
      })
    }
  }, [])

  // Memoized card hover handler
  const handleCardHover = useCallback((index, isEntering) => {
    // Set the currently hovered card index or null if leaving
    setActiveHover(isEntering ? index : null)
  }, [])

  // Memoized ref callback to store card references
  const setCardRef = useCallback((element, index) => {
    CardRef.current[index] = element
  }, [])

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
        .reflect-below {
          -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.15) 85%);
        }
        .gallery-heading {
          color: white;
          text-shadow: 0px 2px 8px rgba(0,0,0,0.3);
          letter-spacing: -0.5px;
        }
        .card-container {
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      box-shadow 0.5s ease,
                      filter 0.5s ease;
        }
        .card-container:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          filter: brightness(1.1);
        }
        .scroll-indicator {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 20;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .gallery-container:hover .scroll-indicator {
          opacity: 1;
        }
        .scroll-indicator:hover {
          background-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-50%) scale(1.1);
        }
        .scroll-indicator.left {
          left: 20px;
        }
        .scroll-indicator.right {
          right: 20px;
        }
        .backdrop {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.96), rgba(10, 10, 10, 0.98));
          backdrop-filter: blur(5px);
          z-index: 40;
        }
        .card-image {
          transition: transform 0.5s ease;
        }
        .card-container:hover .card-image {
          transform: scale(1.05);
        }
        .card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%);
          transition: opacity 0.3s ease;
        }
        .card-container:hover .card-overlay {
          opacity: 0.7;
        }
        .card-content {
          transform: translateY(5px);
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.9;
        }
        .card-container:hover .card-content {
          transform: translateY(0);
          opacity: 1;
        }
        .category-badge {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
        .card-container:hover .category-badge {
          background: rgba(255,255,255,0.25);
        }
      `}
      </style>
      <div className="w-full max-h-screen flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl text-center mb-16"
        >
          <h1 className="text-6xl font-bold gallery-heading relative max-lg:text-5xl max-sm:text-4xl">
            <span className="relative inline-block">
             Projects Showcase
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></span>
            </span>
          </h1>
          <p className="text-white/80 text-xl mt-8 max-w-2xl mx-auto font-light">
            Explore our showcase of innovative design and development work
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="gallery-container h-[38vh] w-full relative mt-10 reflect-below max-lg:h-[40vh] max-sm:h-[30vh]"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "center center",
          }}
        >
          {!expanded && (
            <>
              <div
                className="scroll-indicator left"
                onMouseEnter={() => setHoverSide(-1)}
                onMouseLeave={() => setHoverSide(0)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>
              <div
                className="scroll-indicator right"
                onMouseEnter={() => setHoverSide(1)}
                onMouseLeave={() => setHoverSide(0)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </>
          )}

          <div
            ref={slideRef}
            className={`h-full w-full flex gap-8 hide-scrollbar ${scrollEnabled ? "scroll-smooth" : ""}`}
            style={{
              overflowX: scrollEnabled ? "scroll" : "hidden",
              transform: "rotateX(-5deg)",
              transformStyle: "preserve-3d",
              willChange: "transform",
              transformOrigin: "center center",
            }}
          >
            {extendedProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                currentIndex={CurrentIndex}
                activeHover={activeHover}
                onCardClick={handleCardClick}
                onCardHover={handleCardHover}
                cardRef={setCardRef}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(PremiumGallery)
