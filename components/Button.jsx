"use client"
import React from 'react';

const Button = ({ text, link }) => {
  return (
    <a href={link} className="mt-3 inline-block w-32 max-lg:w-24">
      <div className="bg-[#a1a7a8] border-2 border-[rgb(20,20,20)] py-2.5 px-2.5 max-lg:py-1 max-lg:px-1 inline-block text-xs font-semibold uppercase cursor-pointer transform -skew-x-12 text-black relative overflow-hidden group w-full text-center">
        <span className="inline-block transform skew-x-12 group-hover:text-white transition-colors duration-500">
          {text}
        </span>
        <div className="absolute inset-y-0 right-full left-0 bg-[rgb(20,20,20)] opacity-0 z-[-1] transition-all duration-500 group-hover:right-0 group-hover:opacity-100"></div>
      </div>
    </a>
  );
};

export default Button;
