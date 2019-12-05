/**
 * @class TenbanEditor
 */

import * as React from 'react'

import styles from './styles.css'
import useEditor from './hooks/useEditor'
import { Marker } from './types'

export type Props = { text: string }

export default function TenbanEditor(props: Props) {
  const { text } = props
  const ref = React.useRef<HTMLDivElement | null>(null)

  const defaultMarkers: Marker[] = []

  useEditor({
    ref,
    defaultMarkers,
    onMarkerChanged: () => {
      console.log('called')
    },
  })

  return (
    <div className={styles.test} ref={ref}>
      {text}
    </div>
  )
}
