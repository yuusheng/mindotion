import { type RefObject, useEffect } from 'react'

export function useResizeObserver(
  target: RefObject<HTMLElement>,
  callback: (entries: ResizeObserverEntry[]) => void,
) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback)
    if (!target.current)
      throw new Error(`${target.current} is not a HTMLElement`)

    resizeObserver.observe(target.current!)
    return () => {
      resizeObserver.unobserve(target.current!)
    }
  }, [])
}
