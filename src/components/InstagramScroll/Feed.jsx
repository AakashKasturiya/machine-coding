import React, { useContext, useEffect, useRef } from 'react'
import { FeedContext } from '../../context/FeedContext'
import PostCard from './PostCard'
import LoadingSkeleton from './LoadingSkeleton'

export default function Feed(){
  const { posts, fetchPage, hasMore, loading } = useContext(FeedContext)
  const sentinelRef = useRef(null)

  useEffect(() => {
    // initial fetch if empty
    if (posts.length === 0) fetchPage()
  }, [])

  useEffect(() => {
    const s = sentinelRef.current
    if (!s) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) fetchPage()
      })
    }, { rootMargin: '300px' })
    io.observe(s)
    return () => io.disconnect()
  }, [fetchPage])

  return (
    <section className="space-y-4">
      {posts.map(p => <PostCard key={p.id} post={p} />)}

      {loading && posts.length === 0 && <LoadingSkeleton />}

      <div ref={sentinelRef} />

      {loading && posts.length > 0 && <div className="text-center py-4">Loading more...</div>}

      {!hasMore && <div className="text-center py-4 text-gray-500">End of feed</div>}
    </section>
  )
}