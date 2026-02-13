import React from 'react'

import { useLocation } from 'react-router-dom'

import { tasks } from '../../data/content'
import { Introduction } from './Introduction'
import { CodingPreview } from './CodingPreview'

export const PageShell = ({ children, showPreview = true }) => {
  const location = useLocation()
  const path = location.pathname.slice(1)

  const TasksData = tasks.filter((task) => task.path === path)

  const fallbackTask = {
    id: path || 'home',
    path,
    title: 'React Lab',
    description: 'Select a component from the sidebar to start practicing.',
    category: 'UI',
    type: 'easy',
    points: [],
    concepts: '',
    readTimeMinutes: 5,
    solution: [],
  }

  const dataToRender = TasksData.length > 0 ? TasksData : [fallbackTask]

  return (
    <div>
      <Introduction TasksData={dataToRender} />
      {children}
      {showPreview && TasksData.length > 0 && <CodingPreview TasksData={TasksData} />}
    </div>
  )
}
