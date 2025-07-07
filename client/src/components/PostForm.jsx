export default function PostForm({ post, setPost, onSubmit, setPost, error }){
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
        placeholder="Content"
        className="w-full p-2 border rounded h-40"
        required
      />
       {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  )
}
