// server/routes/posts.js
const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const { postSchema } = require('../validators/postValidator');
const Category = require('../models/Category');

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return await res.json()
}

export async function getPost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`)
  if (!res.ok) throw new Error('Post not found')
  return await res.json()
}

export async function createPost(data) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return await res.json()
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return await res.json()
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete post')
  return await res.json()
}


// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('category');
  res.json(posts);
});

// Get post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Create post
router.post('/', async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Update post
router.put('/:id', async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete post
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
