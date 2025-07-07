const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = new User({ username, password })
  await user.save()
  res.status(201).json({ message: 'User created' })
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' })
  res.json({ token })
})

module.exports = router
