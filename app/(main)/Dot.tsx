'use client'

import { useRef } from 'react'
import './dot.css'
import { useDot } from '~/hooks/ui/useDot'

function Dot() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useDot(canvas)

  return (
    <div className="dot-container absolute top-56 left-20 right-20 bottom-20 -z-10">
      <div className="dot-mask h-full w-full absolute inset-0 z-10"></div>
      <canvas ref={canvas} className="h-full w-full z-0" />
    </div>
  )
}

export default Dot
