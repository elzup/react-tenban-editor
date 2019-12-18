import { RefObject, useEffect, useRef, useState } from 'react'

export type State = {
  elX: number
  elY: number
  elH: number
  elW: number
  x: number
  y: number
}

const useMouse = (ref: RefObject<Element>): State => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('useMouse expects a single ref argument.')
    }
  }

  const frame = useRef(0)
  const [state, setState] = useState<State>({
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const {
            left,
            top,
            width: elW,
            height: elH,
          } = ref.current.getBoundingClientRect()
          const posX = left + window.scrollX
          const posY = top + window.scrollY
          const elX = event.pageX - posX
          const elY = event.pageY - posY

          setState({
            elX,
            elY,
            elH,
            elW,
            x: elX / elW,
            y: elY / elH,
          })
        }
      })
    }

    document.addEventListener('mousemove', moveHandler)

    return () => {
      cancelAnimationFrame(frame.current)
      document.removeEventListener('mousemove', moveHandler)
    }
  }, [ref.current])

  return state
}

export default useMouse
