import * as React from 'react'
import TenbanEditor from '../src'

export default {
  title: 'Welcome',
}
const markers = [
  {
    id: 'rect1',
    x1: 0.1,
    y1: 0.1,
    x2: 0.4,
    y2: 0.3,
    z: 0,
  },
  {
    id: 'rect2',
    x1: 0.5,
    y1: 0.2,
    x2: 0.6,
    y2: 0.4,
    z: 0,
  },
]

export const toStorybook = () => (
  <TenbanEditor defaultMarkers={markers} height={600} width={800} />
)

toStorybook.story = {
  name: 'to Storybook',
}
