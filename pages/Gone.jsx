"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, Server, Wrench } from "lucide-react"

export default function TracingBeamSkills() {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Skills data with more detailed and visually interesting structure
  const skillSections = [
    {
      id: "frontend",
      title: "Frontend Skills",
      icon: <Monitor className="h-10 w-10 text-purple-500" />,
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
      icon: <Server className="h-10 w-10 text-blue-500" />,
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
      icon: <Wrench className="h-10 w-10 text-green-500" />,
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
  ]

  // Calculate node positions for use in both nodes and skill boxes
  const nodePositions = skillSections.map((_, index) => 
    `${20 + (index * 70) / (skillSections.length - 1)}%`
  )

  // Check which section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const viewportHeight = window.innerHeight

      // Calculate scroll progress (0 to 1)
      // Original progress calculation
      const originalProgress = Math.max(0, Math.min(1, (viewportHeight - containerTop) / (containerHeight + viewportHeight)))
      
      // Make the beam progress faster by applying a multiplier (adjust the 1.75 value as needed)
      const acceleratedProgress = Math.min(1, originalProgress * 1.75)
      
      setScrollProgress(acceleratedProgress)

      // Calculate the beam height (from top-10 to bottom-10)
      const beamHeight = containerHeight - 20

      // Calculate node positions in percentage (same as our nodePositions calculation)
      const nodePosPercentages = skillSections.map((_, index) => 
        (20 + (index * 70) / (skillSections.length - 1)) / 100
      )

      // Calculate where the beam has reached based on accelerated progress
      const beamReachedHeight = acceleratedProgress * beamHeight
      
      // Calculate the absolute position of each node on the beam
      const nodeAbsolutePositions = nodePosPercentages.map(percentage => 
        percentage * beamHeight
      )
      
      // Find the highest node that the beam has reached
      let activeNodeIndex = null
      for (let i = 0; i < nodeAbsolutePositions.length; i++) {
        if (beamReachedHeight >= nodeAbsolutePositions[i]) {
          activeNodeIndex = i
        } else {
          break // Stop once we find a node the beam hasn't reached
        }
      }
      
      setActiveSection(activeNodeIndex)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get color classes based on section color
  const getColorClasses = (color) => {
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
  }

  return (
    <div className="relative mx-auto min-h-[100vh] max-w-5xl px-4 py-16" ref={containerRef}>
      {/* Shorter tracing beam with glow effect */}
      <div className="absolute left-1/2 top-10 bottom-10 -ml-px w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

      {/* Animated beam that follows scroll with glow effect */}
      <motion.div
        className="absolute left-1/2 top-10 bottom-10 -ml-[2px] w-[4px] bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"
        style={{
          scaleY: scrollProgress,
          originY: 0,
          filter: "blur(1px)",
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
        }}
      />

      {/* Beam nodes */}
      {skillSections.map((section, index) => {
        const colors = getColorClasses(section.color)
        const isActive = activeSection === index

        return (
          <motion.div
            key={section.id}
            className={`absolute left-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full ${
              isActive ? colors.bg : "bg-slate-200"
            }`}
            style={{ top: nodePositions[index] }}
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
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
            />
            <div className="text-white">{section.icon}</div>
          </motion.div>
        )
      })}

      {/* Skill boxes aligned to the sides */}
      <AnimatePresence>
        {activeSection !== null && (
          <SkillBox 
            key={`box-${activeSection}`} 
            section={skillSections[activeSection]} 
            position={skillSections[activeSection].position}
            nodePosition={nodePositions[activeSection]}
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
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

function SkillBox({ section, position, nodePosition }) {
  const colors = getColorClasses(section.color)
  
  // Position class based on whether it should be on left or right
  const positionClass = position === "left" 
    ? "right-[60%] mr-8" 
    : "left-[60%] ml-8"

  return (
    <motion.div
      className={`absolute ${positionClass} w-full max-w-sm`}
      style={{ top: nodePosition , translateY: "-50%"}} // Use the node position here instead of top-1/2 transform
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
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
              <p className="text-sm text-white/70">{section.description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2">
            {section.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="text-xl">{skill.icon}</div>
                  <h3 className="text-sm font-medium text-white">{skill.name}</h3>
                </div>

                {/* Background glow */}
                <div className="absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-30 blur-sm`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Helper function to get color classes
function getColorClasses(color) {
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
}