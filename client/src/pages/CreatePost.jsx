import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'

export default function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '', category: '' })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    navigate('/')
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Create New Post</h1>
      <PostForm post={post} setPost={setPost} onSubmit={handleSubmit} />
    </div>
  )
}
