import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'
import SinglePost from './pages/SinglePost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   return (
    <div>
      <h1>👨‍🚀👷 Hello from KELTECH🤖🎮</h1>
    </div>
  );
  const [message, setMessage] = useState('Loading...')
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Failed to fetch from API'))
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  )
return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">Fullstack App</h1>
        <p>{message}</p>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
