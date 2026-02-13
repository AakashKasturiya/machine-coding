import React, { createContext, useEffect, useState, useCallback } from 'react'

export const FeedContext = createContext(null)

const PAGE_SIZE = 8
const API_BASE = 'https://dummyjson.com'
const CACHE_KEY = 'ig_feed_cache_v1'

export function FeedProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [layout, setLayout] = useState('list') // 'list' or 'grid'
  const [likes, setLikes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ig_likes') || '{}') } catch { return {} }
  })

  // local caching of fetched pages
  useEffect(() => {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setPosts(parsed.posts || [])
        setSkip(parsed.skip || 0)
        setHasMore(parsed.hasMore ?? true)
      } catch (e) {
        console.warn('cache parse failed', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, skip, hasMore }))
  }, [posts, skip, hasMore])

  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/posts?limit=${PAGE_SIZE}&skip=${skip}`)
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      const newPosts = data.posts || []
      setPosts(prev => [...prev, ...newPosts])
      setSkip(prev => prev + newPosts.length)
      setHasMore(newPosts.length === PAGE_SIZE)
    } catch (err) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }, [skip, loading, hasMore])

  // pull-to-refresh: reload first page and reset cache
  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/posts?limit=${PAGE_SIZE}&skip=0`)
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      setPosts(data.posts || [])
      setSkip((data.posts || []).length)
      setHasMore((data.posts || []).length === PAGE_SIZE)
      localStorage.removeItem(CACHE_KEY)
    } catch (err) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }, [])

  // optimistic like toggle
  const toggleLike = useCallback((postId) => {
    setLikes(prev => {
      const next = {...prev};
      next[postId] = !next[postId]
      localStorage.setItem('ig_likes', JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <FeedContext.Provider value={{ posts, fetchPage, hasMore, loading, error, refresh, toggleLike, likes, layout, setLayout }}>
      {children}
    </FeedContext.Provider>
  )
}