"use client"
import React from 'react';

const SkewedButton = ({ text }) => {
  return (
    <div className="relative ">
      <button className="mt-3  bg-[#a1a7a8] border-2 border-[rgb(20,20,20)] py-2.5 px-2.5 inline-block text-xs font-semibold w-32 uppercase cursor-pointer transform -skew-x-12 text-black relative overflow-hidden group">
        <span className="inline-block transform skew-x-12 group-hover:text-white transition-colors duration-500">{text}</span>
        <div className="absolute inset-y-0 right-full left-0 bg-[rgb(20,20,20)] opacity-0 z-[-1] transition-all duration-500 group-hover:right-0 group-hover:opacity-100"></div>
      </button>
    </div>
  );
}

export default SkewedButton;