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
import { useTheme } from 'next-themes'
import { type RefObject, useEffect } from 'react'
import { useResizeObserver } from '~/hooks/useResizeObserver'

export function useDot(canvas: RefObject<HTMLCanvasElement>) {
  const { theme } = useTheme()

  useResizeObserver(canvas, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    canvas.current!.width = width
    canvas.current!.height = height
  })

  useEffect(() => {
    setDelay(800)
    setMinWidth(5)
    setMaxWidth(90)
    setRoundCap(true)
    setOpacity(1)
    setColor(
      ...new Array(3).fill(
        theme === 'dark' ? 255 : 0,
      ) as [number, number, number],
    )
  }, [theme])

  useEffect(() => {
    const canvasDom = document.querySelector('canvas')!
    const canvasCtx = canvasDom.getContext('2d')!
    const canvasRect = canvasDom.getBoundingClientRect()

    if (!canvasDom || !canvasCtx)
      return

    let mouseTrack: IOriginalPointData[] = []

    let drawing = false
    function draw() {
      canvasCtx.clearRect(0, 0, canvasDom.width, canvasDom.height)

      let needDrawInNextFrame = false
      mouseTrack = drainPoints(mouseTrack)
      if (mouseTrack.length >= 3) {
        drawLaserPen(canvasCtx, mouseTrack)
        needDrawInNextFrame = true
      }

      if (needDrawInNextFrame)
        requestAnimationFrame(draw)
      else
        drawing = false
    }

    function startDrawing() {
      if (!drawing) {
        drawing = true
        draw()
      }
    }

    function handleMouseMove(event: MouseEvent) {
      mouseTrack.push({
        x: event.clientX - canvasRect.x,
        y: event.clientY - canvasRect.y,
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
