"use client"
import React , {useEffect , useRef , useState} from 'react' 
import { GoDotFill } from "react-icons/go";
import Button2 from '../components/Button2';
import Show from './Show';
import TracingBeamSkills from '../components/TracingBeam';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Typewriter from '../reactbits/TextAnimations/SplitText/Typewriter';
import ContactSection  from './ContactMe';


gsap.registerPlugin(ScrollTrigger);
const AboutMe = () => {
const aboutRef = useRef(null);
const LeftRef = useRef(null);
const RightRef = useRef(null);
const [isActive, setIsActive] = useState(false);

useEffect(() => {
  gsap.from(aboutRef.current, {
    scrollTrigger: {
      trigger: aboutRef.current,
      start: "150% bottom",
      end: "bottom center",
      
    },
    y: 50,
    opacity: 0,
    duration: 1,
  })
  gsap.from(LeftRef.current, {
    scrollTrigger: {
      trigger: LeftRef.current,
      start: "center bottom",
      end: "bottom center",
      onEnter: () => setIsActive(true),
      once: true,
    },
   x: -100,
    opacity: 0,
    duration: 1,
  })
  gsap.from(RightRef.current, {
    scrollTrigger: {
      trigger: LeftRef.current,
      start: "center bottom",
      end: "bottom center",
     
    },
   x: 100,
    opacity: 0,
    duration: 1,
  })
  ScrollTrigger.refresh();

},[])

  return (
    <div className='h-auto w-auto relative'>
      {/* This container now has a proper id for the anchor target */}
      <div ref={aboutRef} id='about' className='w-[100%] h-[10vh]  text-center pt-20 max-sm:pt-0'>
        <h1 className='text-5xl font-Theatre tracking-[1.5px]'>About Me</h1>
        <div className='flex justify-center items-center font-chakra text-lg'>
          <h1>Develop</h1>
          <GoDotFill />
          <h1>Deliver</h1>
          <GoDotFill />
          <h1>Repeat</h1>
        </div>
      </div>
      
      <div className='flex justify-between  px-[10vw] py-[15vh] max-sm:py-[8vh] max-sm:px-[2vw]'>
        <div ref={LeftRef} className='w-[45vw] h-auto mt-[4%] flex flex-col max-lg:mt-[8%]  '>
        <h1 className='text-4xl font-mont max-xl:text-3xl max-sm:text-2xl'>
        Hello, I'm{' '}
        </h1>
        <div className='h-[6vh]'>
        <Typewriter  
         text="Jayditya Sharma!"
         speed={200}
         active={isActive}
         cursorStyle="block" // try "underscore" or "default"
         cursorClassName="bg-blue-500" // customize cursor color
         className='text-4xl font-mont max-xl:text-3xl max-sm:text-2xl '
         onComplete={() => setIsActive(false)}
         />
         </div>
         
          <p className='mt-[2vh] font-chakra text-lg  max-md:mt-[5vh] max-md:w-screen max-sm:w-[98vw] max-sm:text-[1.1rem] '>
            I build interfaces that actually feel good to use. I'm a frontend developer who cares 
            about the little things — the flow, the feel, the way something moves when you click it. 
            Right now, I'm deep into building 3D experiences and learning how to make the web more alive. 
            Not here to follow trends — just here to make things that feel right.
          </p>
          <div className='flex gap-10 font-chakra tracking-[1.5px]'>
            <Button2 text="Download CV" />
            <Button2 text='ID'/>
          </div>
        </div>
        <div ref={RightRef} className='relative size-[18rem] mt-[2%] rounded-full Third-border overflow-hidden max-2xl:size-[14rem] max-2xl:mt-[4%] max-lg:size-[10rem] max-lg:mt-[9%] max-sm:mt-[1%] max-sm:size-[8rem]'>
          <div className='h-full w-full scanner '></div>
        </div>
      </div>
      
      <div>
        <div className='relative mt-0 max-2xl:mt-10 '>
          <TracingBeamSkills/>
        </div>
        <div id='projects'></div>
        <Show />
      </div>
      <div > 
       <ContactSection />
      </div>
    </div>
  ) 
}

export default AboutMe