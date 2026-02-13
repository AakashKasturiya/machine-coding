import React, { useContext } from 'react'
import Header from './Header'
import Feed from './Feed'
import { FeedContext } from '../../context/FeedContext'

export default function InstagramScroll() {
  const { layout } = useContext(FeedContext)
  return (
    <div className="min-h-screen">
      <Header />
       <main className={`max-w-4xl mx-auto p-4 ${layout === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
        <Feed />
      </main>
    </div>
  )
}