import { useEffect } from 'react'
import { Marker } from './../types'

type DragOptions = {
  ref: React.MutableRefObject<HTMLDivElement | null>
  defaultMarkers: Marker[]
  onMarkerChanged: () => void
}

const useEditor = ({ ref, defaultMarkers }: DragOptions) => {
  // const [markers, setMarkers] = useState<Marker[]>(defaultMarkers)

  const handleMouseDown = (e: MouseEvent) => {
    console.log('down')
  }
  const handleMouseMove = (e: MouseEvent) => {
    console.log('move')
  }
  const handleMouseUp = (e: MouseEvent) => {
    console.log('up')
  }

  useEffect(() => {
    const elem = ref.current

    if (elem === null) {
      return
    }
    elem.addEventListener('mousedown', handleMouseDown)
    elem.addEventListener('mouseup', handleMouseMove)
    elem.addEventListener('mousemove', handleMouseUp)
    return () => {
      if (ref.current) {
        elem.removeEventListener('mousedown', handleMouseDown)
        elem.removeEventListener('mouseup', handleMouseMove)
        elem.removeEventListener('mousemove', handleMouseUp)
      }
    }
  }, [ref.current])
  return {}
}

export default useEditor
