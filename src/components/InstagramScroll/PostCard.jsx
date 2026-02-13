import React, { useContext } from 'react'
import { FeedContext } from '../../context/FeedContext'

export default function PostCard({ post }){
  const { toggleLike, likes } = useContext(FeedContext)
  const liked = !!likes[post.id]
  const imageUrl = `https://picsum.photos/seed/post-${post.id}/800/600`
  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <img src={`https://i.pravatar.cc/48?img=${(post.userId % 70) + 1}`} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-sm">User {post.userId}</div>
          <div className="text-xs text-gray-500">{new Date().toLocaleString()}</div>
        </div>
      </div>

      <img src={imageUrl} alt={post.title} className="w-full h-64 object-cover" />

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={() => toggleLike(post.id)} aria-label="like" className="text-xl">{liked ? '❤️' : '♡'}</button>
            <button aria-label="comment" className="text-xl">💬</button>
            <button aria-label="share" className="text-xl">✈️</button>
          </div>
          <div className="text-sm text-gray-500">{liked ? 'You and 499 others' : '500 likes'}</div>
        </div>

        <h3 className="font-medium mb-1">{post.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{post.body}</p>
      </div>
    </article>
  )
}