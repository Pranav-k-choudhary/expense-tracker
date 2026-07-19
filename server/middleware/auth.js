import jwt from 'jsonwebtoken'
import { fallbackUsers } from '../data/fallbackStore.js'
import { isMongoReady } from '../config/db.js'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'expense-tracker-secret'

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (!isMongoReady()) {
      const foundUser = fallbackUsers.find((user) => user.email === decoded.email)

      if (!foundUser) {
        return res.status(401).json({ message: 'User not found' })
      }

      req.user = {
        id: foundUser._id || `local-${foundUser.email}`,
        email: foundUser.email,
        name: foundUser.name,
      }

      return next()
    }

    const foundUser = await User.findById(decoded.id)

    if (!foundUser) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      id: foundUser._id.toString(),
      email: foundUser.email,
      name: foundUser.name,
    }

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default authenticate
