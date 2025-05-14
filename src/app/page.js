
import React from 'react'
import Hero from '../../pages/Hero'
import AboutMe from '../../pages/AboutMe'


export default function Home() {

  return (
    <div className='w-full overflow-x-hidden min-h-screen'>
      <Hero />
      <AboutMe />
    </div>
  )
}
