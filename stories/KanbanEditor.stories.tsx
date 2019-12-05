import * as React from 'react'
import KanbanEditor from '../src/'

export default {
  title: 'Welcome',
}

export const toStorybook = () => <KanbanEditor />

toStorybook.story = {
  name: 'to Storybook',
}
