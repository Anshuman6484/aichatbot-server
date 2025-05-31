import './config/env.js'
import connectDB from './config/dbConfig.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Connect to DB
connectDB()

// Routes
app.use('/api/auth', authRoutes)

export default app
