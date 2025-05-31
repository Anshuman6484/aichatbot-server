import app from './app.js'
import connectDB from './config/dbConfig.js'

const port = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to connect to DB', err)
    process.exit(1)
  }
}

startServer()
