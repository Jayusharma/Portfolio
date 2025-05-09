"use client"
import React from 'react';
import "./Button2.css"

const Button2 = ({ text = "Watch" }) => {
  return (
<button className='btn'>
        {text}
    </button>
  );
}

export default Button2;