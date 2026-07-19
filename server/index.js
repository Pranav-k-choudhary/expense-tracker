import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectMongo } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)

const startServer = async () => {
  try {
    await connectMongo()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('MongoDB connect failed:', error.message)
    app.listen(PORT, () => {
      console.log(`Server running in fallback mode on http://localhost:${PORT}`)
    })
  }
}

startServer()
