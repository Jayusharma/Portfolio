"use client"

import React from 'react'
import useLenisScroll from './useLenis'

export default function ClientLenisProvider({ children }) {
  useLenisScroll()
  
  return <>{children}</>
}