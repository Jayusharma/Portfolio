"use client"

import React from "react"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, Server, Wrench } from "lucide-react"

export default function TracingBeamSkills() {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isBeamActive, setIsBeamActive] = useState(false)

  // You can adjust these values as needed
  const triggerOffset = 200 // How many pixels into the component view before the beam activates
  const accelerationFactor = 1.5 // How fast the beam progresses (higher = faster)

  // Custom hook for media query
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
      const media = window.matchMedia(query)
      setMatches(media.matches)

      const listener = (e) => setMatches(e.matches)
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }, [query])

    return matches
  }

  const isSmallScreen = useMediaQuery("(max-width: 640px)")

  // Skills data with more detailed and visually interesting structure
  const skillSections = useMemo(
    () => [
      {
        id: "frontend",
        title: "Frontend Skills",
        icon: <Monitor className="size-10 text-purple-500 max-lg:size-7 max-sm:size-5" />,
        color: "purple",
        position: "right", // Show on right side
        description: "Creating beautiful, responsive, and interactive user interfaces",
        items: [
          { name: "React", icon: "⚛️" },
          { name: "Next.js", icon: "▲" },
          { name: "TypeScript", icon: "TS" },
          { name: "Tailwind CSS", icon: "🌊" },
          { name: "Framer Motion", icon: "🔄" },
          { name: "Redux", icon: "🔄" },
          { name: "CSS/SASS", icon: "🎨" },
          { name: "HTML5", icon: "📄" },
        ],
      },
      {
        id: "backend",
        title: "Backend Skills",
        icon: <Server className="size-10 text-blue-500 max-lg:size-7 max-sm:size-5" />,
        color: "blue",
        position: "left", // Show on left side
        description: "Building robust, scalable, and secure server-side applications",
        items: [
          { name: "Node.js", icon: "🟢" },
          { name: "Express", icon: "🚂" },
          { name: "PostgreSQL", icon: "🐘" },
          { name: "MongoDB", icon: "🍃" },
          { name: "GraphQL", icon: "◼️" },
          { name: "REST APIs", icon: "🔌" },
          { name: "Firebase", icon: "🔥" },
          { name: "AWS", icon: "☁️" },
        ],
      },
      {
        id: "tools",
        title: "Tools & Practices",
        icon: <Wrench className="size-10 text-green-500 max-lg:size-7 max-sm:size-5" />,
        color: "green",
        position: "right", // Show on right side
        description: "Leveraging modern tools and methodologies for efficient development",
        items: [
          { name: "Git", icon: "🔄" },
          { name: "Docker", icon: "🐳" },
          { name: "CI/CD", icon: "🔄" },
          { name: "Testing", icon: "🧪" },
          { name: "Agile", icon: "🔄" },
          { name: "Webpack", icon: "📦" },
          { name: "Vite", icon: "⚡" },
          { name: "Figma", icon: "🎨" },
        ],
      },
    ],
    [],
  )

  // Calculate node positions for use in both nodes and skill boxes
  const nodePositions = useMemo(
    () => skillSections.map((_, index) => `${20 + (index * 70) / (skillSections.length - 1)}%`),
    [skillSections],
  )

  // Improved scroll handling logic with requestAnimationFrame for better performance
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    // Get container position relative to the viewport
    const containerRect = containerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Calculate how far the top of the container is from the bottom of the viewport
    const containerDistanceFromViewport = windowHeight - containerRect.top

    // Check if we've scrolled the container into view by the trigger amount
    if (containerDistanceFromViewport >= triggerOffset) {
      setIsBeamActive(true)

      // Calculate progress based on how far we've scrolled into the container
      const totalScrollDistance = containerRect.height + windowHeight - triggerOffset
      const currentScrollDistance = containerDistanceFromViewport - triggerOffset

      const rawProgress = currentScrollDistance / totalScrollDistance
      const clampedProgress = Math.max(0, Math.min(1, rawProgress * accelerationFactor))

      setScrollProgress(clampedProgress)

      // Calculate which node is active based on progress
      const beamHeight = containerRect.height - 20

      // Calculate node positions in percentage
      const nodePosPercentages = skillSections.map((_, index) => (15 + (index * 75) / (skillSections.length - 1)) / 100)

      // Calculate where the beam has reached based on progress
      const beamReachedHeight = clampedProgress * beamHeight

      // Find the highest node that the beam has reached
      let activeNodeIndex = null
      for (let i = 0; i < nodePosPercentages.length; i++) {
        if (beamReachedHeight >= nodePosPercentages[i] * beamHeight) {
          activeNodeIndex = i
        } else {
          break
        }
      }

      setActiveSection(activeNodeIndex)
    } else {
      setIsBeamActive(false)
      setScrollProgress(0)
      setActiveSection(null)
    }
  }, [skillSections, triggerOffset, accelerationFactor])

  // Optimized scroll event with requestAnimationFrame
  useEffect(() => {
    let ticking = false
    let rafId = null

    const scrollListener = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", scrollListener)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [handleScroll])

  // Get color classes based on section color - memoized for performance
  const getColorClasses = useCallback((color) => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-purple-500",
          bgLight: "bg-purple-100",
          bgDark: "bg-purple-900",
          text: "text-purple-500",
          border: "border-purple-300",
          shadow: "shadow-purple-500/20",
          glow: "shadow-purple-500/30",
          gradient: "from-purple-600 to-purple-900",
        }
      case "blue":
        return {
          bg: "bg-blue-500",
          bgLight: "bg-blue-100",
          bgDark: "bg-blue-900",
          text: "text-blue-500",
          border: "border-blue-300",
          shadow: "shadow-blue-500/20",
          glow: "shadow-blue-500/30",
          gradient: "from-blue-600 to-blue-900",
        }
      case "green":
        return {
          bg: "bg-green-500",
          bgLight: "bg-green-100",
          bgDark: "bg-green-900",
          text: "text-green-500",
          border: "border-green-300",
          shadow: "shadow-green-500/20",
          glow: "shadow-green-500/30",
          gradient: "from-green-600 to-green-900",
        }
      default:
        return {
          bg: "bg-slate-500",
          bgLight: "bg-slate-100",
          bgDark: "bg-slate-900",
          text: "text-slate-500",
          border: "border-slate-300",
          shadow: "shadow-slate-500/20",
          glow: "shadow-slate-500/30",
          gradient: "from-slate-600 to-slate-900",
        }
    }
  }, [])

  return (
    <div className="relative mx-auto min-h-[90vh] max-w-5xl px-4 py-10 max-sm:px-1 max-2xl:min-h-[110vh] max-lg:min-h-[90vh] " ref={containerRef}>
      {/* Static beam background */}
      <div className="absolute left-1/2 top-10 bottom-10 -ml-px w-[1px] max-sm:left-[10vw] bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

      {/* Animated beam that follows scroll with glow effect - only shows when triggered */}
      <motion.div
        className="absolute left-1/2 top-10 bottom-20 -ml-[2px] w-[4px] max-sm:left-[10vw] bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"
        style={{
          scaleY: scrollProgress,
          originY: 0,
          filter: "blur(1px)",
          opacity: isBeamActive ? 1 : 0,
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
          willChange: "transform, opacity",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Beam nodes */}
      {skillSections.map((section, index) => {
        const colors = getColorClasses(section.color)
        const isActive = activeSection === index && isBeamActive

        return (
          <motion.div
            key={section.id}
            className={`absolute left-1/2 -ml-6 -mt-6 flex size-12 items-center justify-center rounded-full max-sm:left-[10vw] max-lg:size-8  max-sm:size-6 max-lg:-ml-4 max-lg:-mt-4 max-sm:-ml-3 max-sm:-mt-0  ${
              isActive ? colors.bg : "bg-slate-200"
            }`}
            style={{
              top: nodePositions[index],
              willChange: isActive ? "transform, opacity, box-shadow" : "auto",
            }}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={
              isActive
                ? {
                    scale: 1.2,
                    opacity: 1,
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                  }
                : {
                    scale: 0.8,
                    opacity: 0.5,
                    boxShadow: "none",
                  }
            }
            transition={{ duration: 0.7 }}
          >
            <motion.div
              animate={isActive ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
              style={{ willChange: isActive ? "transform" : "auto" }}
            />
            <div className="text-white">{section.icon}</div>
          </motion.div>
        )
      })}

      {/* Skill boxes aligned to the sides */}
      <AnimatePresence mode="wait">
        {activeSection !== null && isBeamActive && (
          <SkillBox
            key={`box-${activeSection}`}
            section={skillSections[activeSection]}
            position={skillSections[activeSection].position}
            nodePosition={nodePositions[activeSection]}
            isSmallScreen={isSmallScreen}
            getColorClasses={getColorClasses}
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 max-sm:-top-20 flex justify-center">
        <motion.div
          className="mt-8 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Scroll down to explore my skills
        </motion.div>
      </div>
    </div>
  )
}

// Memoized SkillBox component to prevent unnecessary re-renders
const SkillBox = React.memo(({ section, position, nodePosition, isSmallScreen, getColorClasses }) => {
  const colors = getColorClasses(section.color)

  // Position class based on whether it should be on left or right
  const positionClass =
    position === "left"
      ? "right-[60%] mr-8 max-lg:right-[50%] max-sm:left-[5%] max-sm:ml-4 "
      : "left-[60%] ml-8  max-lg:left-[50%] max-sm:left-[5%] max-sm:ml-4"

  return isSmallScreen ? (
    <motion.div
      className={`absolute ${positionClass} w-full max-w-xs scale-[0.8]`}
      style={{
        top: nodePosition,
        translateY:"-50%",
        willChange: "opacity, transform",
      }}
      initial={{ opacity: 0, x: position === "left" ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: position === "left" ? 50 : -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`rounded-xl bg-gradient-to-br ${colors.gradient} p-1 shadow-xl`}>
        <div className="relative rounded-lg bg-slate-900/90 p-4 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-4 flex items-center space-x-3">
            <div className={`rounded-xl ${colors.bg} p-2 shadow-lg ${colors.glow}`}>{section.icon}</div>
            <div>
              <h2 className="text-lg font-mont text-white">{section.title}</h2>
              <p className="text-xs text-white/70 font-chakra">{section.description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2 font-chakra">
            {section.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.03, // Slightly faster appearance
                  duration: 0.2,
                }}
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-lg">{skill.icon}</div>
                  <h3 className="text-xs font-medium text-white">{skill.name}</h3>
                </div>
                <div className="absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-30 blur-sm`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      className={`absolute ${positionClass} w-full max-w-sm`}
      style={{
        top: nodePosition,
        translateY:"-60%",
        willChange: "opacity, transform",
      }}
      initial={{ opacity: 0, x: position === "left" ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: position === "left" ? 50 : -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`rounded-xl bg-gradient-to-br ${colors.gradient} p-1 shadow-xl`}>
        <div className="relative rounded-lg bg-slate-900/90 p-4 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-4 flex items-center space-x-3">
            <div className={`rounded-xl ${colors.bg} p-2 shadow-lg ${colors.glow}`}>{section.icon}</div>
            <div>
              <h2 className="text-xl font-mont text-white max-lg:text-lg">{section.title}</h2>
              <p className="text-sm text-white/70 font-chakra max-lg:text-xs">{section.description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2 font-chakra">
            {section.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 max-lg:p-1.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.03, // Slightly faster appearance
                  duration: 0.2,
                }}
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-xl max-lg:text-lg">{skill.icon}</div>
                  <h3 className="text-sm font-medium text-white max-lg:text-xs">{skill.name}</h3>
                </div>
                <div className="absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-30 blur-sm`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

// Add display name for React.memo component
SkillBox.displayName = "SkillBox"
