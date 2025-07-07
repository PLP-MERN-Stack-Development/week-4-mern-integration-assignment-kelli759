import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../context/PostContext'
import { getPosts } from '../api/posts'
export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
     const fetchData = async () => {
      dispatch({ type: 'LOADING' })
      try {
        const data = await getPosts()
        dispatch({ type: 'SET_POSTS', payload: data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: 'Failed to load posts' })
      }
    }
    fetchData()
  }, [])

  if (state.loading) return <p>Loading...</p>
  if (state.error) return <p className="text-red-500">{state.error}</p>

    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}
