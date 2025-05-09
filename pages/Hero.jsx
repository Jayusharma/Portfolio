"use client"
import React from 'react'
import Button from "../components/Button";
import Icons from "../components/Icons";

const Hero = () => {
  return (
    <div className='h-screen w-screen grid grid-cols-2 relative'>
      <img 
        src="/pp.jpg" 
        alt="" 
        className='h-full w-full object-cover absolute -z-10' 
      />
      <div className='col-start-2  z-10 pt-[22vh] pl-[10vw] '>
        <div className="pl-6  thin-border pb-20  z-10 max-w-[35vw] ">
          <h1 className="text-7xl  text-white mt-20 font-strig  ">Frontend</h1>
          <h1 className="text-5xl  text-white font-strig ">Developer</h1>
          <p className="mt-2 text-sm md:text-2xl text-gray-300 ml-0 font-chakra  ">
            Computer Science Student
          </p>
          <p className="mt-2 text-sm md:text-2xl text-gray-300  ml-0 font-chakra">
            Your brand deserves more than a template.
          </p>
          <p className="text-sm md:text-2xl text-gray-300 ml-0 font-chakra">
            Let's turn scrolls into stares
          </p>
          <div className="flex items-center gap-2 mt-4 font-chakra tracking-[1.5px]">
            <Button text="Connect" />
            <Button text="Projects" />
          </div>
          <Icons />
        </div>
      </div>
      <div className='h-[20vh] w-full absolute  blend top-[90vh]'></div>
    </div>
  )
}

export default Hero
