import React from 'react'
import { GoDotFill } from "react-icons/go";
import Button2 from '../components/Button2';
import Show from './Show';
import TracingBeamSkills from '../components/TracingBeam';



const AboutMe = () => {
  return (
    <div className='h-auto w-auto relative '>
        <div className='w-[100%] h-[10vh]   relative top-[13vh] text-center '>
            <h1 className='text-5xl font-Theatre tracking-[1.5px]' >About Me</h1>
            <div className='flex justify-center items-center font-chakra text-lg'>
              <h1>Develop</h1>
              <GoDotFill  />
              <h1>Deliver</h1>
              <GoDotFill />
              <h1>Repeat</h1>
              </div>
              </div>
              <div className='flex  justify-between  relative top-[22vh] px-[10vw]'>
                <div className=' w-[45vw] h-auto mt-[4%] flex flex-col  '>
                  <h1 className='text-4xl font-mont '>Hello, I'm</h1>
                  <h1 className='text-4xl font-mont '>Jayditya Sharma</h1>
                <p className='mt-[2vh] font-chakra text-lg'>I build interfaces that actually feel good to use. I'm a frontend developer who cares about the little things — the flow, the feel, the way something moves when you click it. Right now, I'm deep into building 3D experiences and learning how to make the web more alive. Not here to follow trends — just here to make things that feel right.</p>
                <div className='flex gap-10 font-chakra tracking-[1.5px]'>
                <Button2 text="Downlaod CV" />
                <Button2 text='ID'/>
                </div>
                </div>
                <div className='relative border-1  size-[18rem] mt-[2%] rounded-full overflow-hidden '>
                  <div className='h-full w-full scanner' 
                  ></div>
                </div>
                </div>
           <div >
           <div className='relative top-[40vh]'>
            <TracingBeamSkills/>
            </div>
            <div></div>
            <Show />
            
       
           </div>
    </div>
  )
}

export default AboutMe