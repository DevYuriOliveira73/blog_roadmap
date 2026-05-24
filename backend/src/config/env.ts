import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/blog",
  PORT: process.env.PORT || 8000,
}