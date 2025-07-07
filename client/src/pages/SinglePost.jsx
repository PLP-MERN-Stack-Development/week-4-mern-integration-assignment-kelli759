import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function SinglePost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [])

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <Link to={`/edit/${post._id}`} className="text-blue-600">Edit Post</Link>
    </div>
  )
}
