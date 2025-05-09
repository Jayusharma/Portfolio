import React from 'react'

const VIew = () => {
  return (
  /* From Uiverse.io by tirth_5172 */ 
<button
  className="relative cursor-pointer py-2 px-4 text-center  inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  focus:outline-white focus:outline-offset-4 overflow-hidden"
>
  <span className="relative z-20 text-[0.9rem]">view</span>

  <span
    className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"
  ></span>

  <span
    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#d4edf9b8] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"
  ></span>
  <span
    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#d4edf9c1] absolute group-hover:h-[90%] h-[20%] rounded-tr-lg border-r-1 border-t-1 top-0 right-0"
  ></span>
  <span
    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#d4edf9b0] absolute h-[20%] group-hover:h-[90%] rounded-bl-lg border-l-1 border-b-1 left-0 bottom-0"
  ></span>
  <span
    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#d4edf9b2] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"
  ></span>
</button>


  )
}

export default VIew