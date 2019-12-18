import { useState, useEffect, RefObject } from 'react'

export default function useMouseDown(ref: RefObject<Element>) {
  const [down, setDown] = useState<boolean>(false)

  const handleMouseDown = () => setDown(true)
  const handleMouseUp = () => setDown(false)

  useEffect(() => {
    if (!ref || !ref.current) return
    ref.current.addEventListener('mousedown', () => setDown(true))
    window.addEventListener('mouseup', () => setDown(false))
    return () => {
      if (!ref || !ref.current) return
      ref.current.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [ref.current])
  return down
}
