import React, { useContext } from 'react'
import { FeedContext } from '../../context/FeedContext'

export default function Header(){
  const { posts, refresh, layout, setLayout } = useContext(FeedContext)
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Insta-like Feed</h1>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="px-3 py-1 bg-primary/10 rounded">Refresh</button>
          <button onClick={() => setLayout(layout === 'list' ? 'grid' : 'list')} className="px-3 py-1 rounded border">
            {layout === 'list' ? 'Grid' : 'List'}
          </button>
          <div className="text-sm text-gray-500">{posts.length} posts</div>
        </div>
      </div>
    </header>
  )
}