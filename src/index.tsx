import * as React from 'react'

import useEditor from './hooks/useEditor'
import { MarkerProps } from './types'

export type Props = {
  width: number
  height: number
  defaultMarkers: MarkerProps[]
}

function Marker({ x1, y1, x2, y2, z }: MarkerProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x1 * 100}%`,
        top: `${y1 * 100}%`,
        background: 'green',
        width: `${(x2 - x1) * 100}%`,
        height: `${(y2 - y1) * 100}%`,
        zIndex: z,
      }}
    ></div>
  )
}

function useRef(initialValue: HTMLElement | null) {
  const [ref] = React.useState({ current: initialValue })

  return ref
}

export default function TenbanEditor({ defaultMarkers, width, height }: Props) {
  const target = useRef(null)

  const { markers, mouse, grabMarker } = useEditor(target, defaultMarkers)

  console.log({ markers, mouse, grabMarker })

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width,
          height,
          border: 'solid black 1px',
          userSelect: 'none',
        }}
        ref={node => (target.current = node)}
      >
        {Object.values(markers).map(marker => (
          <Marker key={marker.id} {...marker} />
        ))}
      </div>
      <p>
        mouse: (x: {mouse.pos.x}, y: {mouse.pos.y})
      </p>
      <p>
        drag: {mouse.dragState.drag}
        {mouse.dragState.drag && (
          <>
            (x: {mouse.dragState.startPos.x}, y: {mouse.dragState.startPos.y})
          </>
        )}
      </p>
      <p>grab: {grabMarker?.id}</p>
    </div>
  )
}
