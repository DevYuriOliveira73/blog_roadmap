//docker run --name blog -p 27017:27017 -d mongodb/mongodb-community-server:latest
import mongoose from 'mongoose'
import { env } from './env.js'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose
      .connect(`${env.MONGODB_URI}`)

    console.log(`\n MongoDB connected !!!
      ${connectionInstance.connection.host}:${connectionInstance.connection.port}`) //.connection.host
    
  } catch (error) {
    console.log('MongoDB connection failed', error)
    process.exit(1)
  }
}

export default connectDB;