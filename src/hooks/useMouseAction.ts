import { useState, useEffect, RefObject } from 'react'
import useMouse from './useMouse'
import useMouseDown from './useMouseDown'

export type Position = {
  x: number
  y: number
}
export type DragState =
  | {
      drag: false
    }
  | {
      drag: true
      startPos: Position
      diffPos: Position
    }

const useMouseAction = (
  ref: RefObject<Element>
): [{ x: number; y: number }, boolean, DragState] => {
  useMouse
  const [mouseState, setMouseState] = useState<DragState>({
    drag: false,
  })
  const { x, y } = useMouse(ref)
  const down = useMouseDown(ref)

  useEffect(() => {
    if (down) {
      setMouseState({
        drag: true,
        startPos: { x, y },
        diffPos: { x: 0, y: 0 },
      })
    } else {
      setMouseState({ drag: false })
    }
  }, [down])

  useEffect(() => {
    if (!mouseState.drag) {
      return
    }
    setMouseState({
      ...mouseState,
      diffPos: {
        x: mouseState.startPos.x - x,
        y: mouseState.startPos.y - y,
      },
    })
  }, [x, y])

  return [{ x, y }, down, mouseState]
}

export default useMouseAction
