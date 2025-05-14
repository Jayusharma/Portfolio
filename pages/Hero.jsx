"use client"
import React, { useEffect, useRef } from 'react'
import Button from "../components/Button"
import Icons from "../components/Icons"
import { gsap } from 'gsap'
import SplitText from '../reactbits/TextAnimations/SplitText/SplitText'

// Register GSAP plugins


const Hero = () => {
  const overlayRef = useRef(null)
  const belowRef = useRef(null)
  const mainRef = useRef(null)
  
  useEffect(() => {
    // Create master timeline for better control
    const masterTl = gsap.timeline({
      defaults: { 
        ease: "power3.out", 
        duration: 1 
      }
    })
    
    // Get all elements for staggered animation
    const elements = belowRef.current?.querySelectorAll(':scope > *')
    
    // Build animation sequence
    masterTl
      .fromTo(overlayRef.current, 
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0 }
      )
      .fromTo('.split-text-char', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.02 },
        "-=0.7" // Start slightly before previous animation ends
      )
      .fromTo(elements, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1 },
        "-=0.4" // Start slightly before previous animation ends
      )
    
    // Cleanup function
    return () => {
      // Kill all animations and ScrollTriggers when component unmounts
      masterTl.kill()
      
    }
  }, [])
  
  return (
    <div ref={mainRef} className='h-screen w-screen grid grid-cols-2 max-sm:grid-cols-1 relative overflow-hidden'>
      <img
        src="/pp.jpg"
        alt="Background"
        className='h-full w-full object-cover absolute -z-10 pointer-events-none'
        loading="eager"
      />
      <div ref={overlayRef} className='col-start-2 max-sm:col-start-1 z-10 pt-[22vh] pl-[10vw] max-lg:pl-[6vw] max-sm:pt-[18vh]'>
        <div className="pl-6 thin-border pb-20 z-10 max-w-[35vw] max-lg:max-w-[40vw] max-lg:pl-4 max-lg:pb-10 max-sm:min-w-[80vw]">
          <div className="mt-20 max-sm:mt-10">
            <SplitText text='Frontend' className="text-7xl text-white font-strig max-2xl:text-6xl max-xl:text-5xl max-lg:text-4xl" />
          </div>
          <SplitText text='Developer' className="text-5xl text-white font-strig max-2xl:text-4xl max-lg:text-3xl" />
          <div ref={belowRef}>
            <p className="mt-2 text-2xl text-gray-300 ml-0 font-chakra max-2xl:text-xl max-lg:text-lg">
              Computer Science Student
            </p>
            <p className="mt-2 text-2xl text-gray-300 ml-0 font-chakra max-2xl:text-xl max-lg:text-lg max-sm:mt-1">
              Your brand deserves more than a template.
            </p>
            <p className="text-2xl text-gray-300 ml-0 font-chakra max-2xl:text-xl max-lg:text-lg">
              Let's turn scrolls into stares
            </p>
            <div className="flex items-center gap-2 mt-4 font-chakra tracking-[1.5px] max-2xl:mt-2 max-lg:mt-0">
              <Button text="Connect" link={"#Contact"} />
              <Button text="Projects" link={"#projects"}/>
            </div>
            <Icons />
          </div>
        </div>
      </div>
      <div className='h-[20vh] w-full absolute blend top-[90vh]'></div>
    </div>
  )
}

export default Hero