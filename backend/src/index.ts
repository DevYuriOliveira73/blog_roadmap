import connectDB from './config/database.js'
import app from './app.js'
import { env } from './config/env.js'



const startServer = async () => {
  try {
    await connectDB()

    app.on('error', (error) => {
      console.log('ERROR', error);
      throw error;
    })

    app.listen(env.PORT,
      () => {
        console.log(`Server is running on port:
          http://localhost:${env.PORT}`)
      }
    )

  } catch (error) {
    console.log('MongoBD connection failed!!', error)
  }
}


startServer()
