import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { fallbackUsers } from '../data/fallbackStore.js'
import { isMongoReady } from '../config/db.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'expense-tracker-secret'

const generateToken = (user) => jwt.sign(
  {
    id: user._id || `local-${user.email}`,
    email: user.email,
    name: user.name,
  },
  JWT_SECRET,
  { expiresIn: '1d' }
)

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' })
  }

  if (!isMongoReady()) {
    const existingUser = fallbackUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const user = {
      _id: `local-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    }

    fallbackUsers.push(user)

    return res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    })
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    })

    return res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (!isMongoReady()) {
    const foundUser = fallbackUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, foundUser.password)

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: generateToken(foundUser),
      user: { id: foundUser._id, name: foundUser.name, email: foundUser.email },
    })
  }

  try {
    const foundUser = await User.findOne({ email: email.toLowerCase() })

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValid = await foundUser.comparePassword(password)

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: generateToken(foundUser),
      user: { id: foundUser._id, name: foundUser.name, email: foundUser.email },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

export default router
