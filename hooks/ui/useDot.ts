import {
  type IOriginalPointData,
  drainPoints,
  drawLaserPen,
  setColor,
  setDelay,
  setMaxWidth,
  setMinWidth,
  setOpacity,
  setRoundCap,
} from 'laser-pen'
import { type RefObject, useEffect } from 'react'
import { useResizeObserver } from '~/hooks/useResizeObserver'

export function useDot(canvas: RefObject<HTMLCanvasElement>) {
  useResizeObserver(canvas, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    canvas.current!.width = width
    canvas.current!.height = height
  })

  useEffect(() => {
    const canvasDom = document.querySelector('canvas')!
    const canvasPos = canvasDom.getBoundingClientRect()
    const ctx = canvasDom.getContext('2d')!

    let mouseTrack: IOriginalPointData[] = []

    let drawing = false
    function draw() {
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)

      let needDrawInNextFrame = false
      mouseTrack = drainPoints(mouseTrack)
      if (mouseTrack.length >= 3) {
        drawLaserPen(ctx, mouseTrack)
        needDrawInNextFrame = true
      }

      if (needDrawInNextFrame)
        requestAnimationFrame(draw)
      else
        drawing = false
    }
    setDelay(800)
    setMinWidth(5)
    setMaxWidth(90)
    // setColor(255, 255, 255)
    setColor(0, 0, 0)
    setRoundCap(true)
    setOpacity(1)

    const startDrawing = () => {
      if (!drawing) {
        drawing = true
        draw()
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseTrack.push({
        x: event.clientX - canvasPos.x,
        y: event.clientY - canvasPos.y,
        time: Date.now(),
      })

      startDrawing()
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
}
