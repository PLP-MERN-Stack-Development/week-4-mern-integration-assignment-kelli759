import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link to="/" className="font-bold text-lg">My Blog</Link>
        <Link to="/create" className="bg-white text-blue-600 px-3 py-1 rounded">New Post</Link>
      </div>
    </nav>
  )
}
