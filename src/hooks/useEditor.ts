import { useEffect, useState, RefObject } from 'react'
import { MarkerProps } from './../types'
import useMouseAction, { Position } from './useMouseAction'

type Rule = {
  id: string
  hit: (p: Position) => boolean
}

function makeRule(marker: MarkerProps) {
  return {
    id: marker.id,
    hit: (p: Position) =>
      marker.x1 <= p.x &&
      p.x <= marker.x2 &&
      marker.y1 <= p.y &&
      p.y <= marker.y2,
  }
}

const useEditor = (ref: RefObject<Element>, defaultMarkers: MarkerProps[]) => {
  const [markers, setMarkers] = useState<{ [id: string]: MarkerProps }>(
    defaultMarkers.reduce((p, c) => ({ ...p, [c.id]: c }), {})
  )
  const [rules, setRules] = useState<Rule[]>([])

  const [grabMarker, setGrabMarker] = useState<MarkerProps | null>(null)
  const [pos, down, dragState] = useMouseAction(ref)

  useEffect(() => {
    const rules = Object.values(markers)
      .sort((a, b) => (a.z || 0) - (b.z || 0))
      .map(makeRule)

    setRules(rules)
  }, [markers])

  useEffect(() => {
    if (grabMarker === null || !dragState.drag) return

    setMarkers(state => ({
      ...state,
      [grabMarker.id]: {
        ...grabMarker,
        x1: grabMarker.x1 - (dragState.diffPos.x as number),
        y1: grabMarker.y1 - (dragState.diffPos.y as number),
        x2: grabMarker.x2 - (dragState.diffPos.x as number),
        y2: grabMarker.y2 - (dragState.diffPos.y as number),
      },
    }))
  }, [pos])

  useEffect(() => {
    if (dragState.drag) {
      const rule = rules.find(rule => rule.hit(dragState.startPos))

      if (rule) {
        setGrabMarker(markers[rule.id])
      }
    } else {
      setGrabMarker(null)
    }
  }, [dragState.drag])

  return { markers, grabMarker, mouse: { pos, down, dragState } }
}

export default useEditor
