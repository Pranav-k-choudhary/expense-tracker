import 'dotenv/config'
import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI
let databaseAvailable = Boolean(mongoUri)

const isMongoReady = () => Boolean(mongoUri) && databaseAvailable && mongoose.connection.readyState === 1

const connectMongo = async () => {
  if (!mongoUri) {
    databaseAvailable = false
    return null
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: 'expense-tracker',
    })

    databaseAvailable = true
    console.log('MongoDB connected successfully')
    return mongoose.connection
  } catch (error) {
    databaseAvailable = false
    console.error('MongoDB connect failed:', error.message)
    throw error
  }
}

export { connectMongo, isMongoReady, mongoUri, databaseAvailable }
