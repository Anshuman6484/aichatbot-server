import User from '../models/user.js'
import Conversation from '../models/conversation.js'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

// signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log('name, email, password', name, email, password)

    // check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const user = await User.create({ name, email, password })
    const token = createToken(user._id)

    // start a new conversation immediately after signup
    const conversation = await Conversation.create({ userId: user._id })

    res.status(201).json({
      msg: 'Signup Successful',
      user,
      token,
      conversationId: conversation._id,
    })
  } catch (err) {
    console.log('signup error', err)
    res.status(500).json({ error: 'signup failed' })
  }
}

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ msg: 'Invalid Credentials' })
    }
    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    )
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Invalid Credentials' })
    }

    const token = createToken(user._id)

    // mark all existing conversations as inactive
    await Conversation.updateMany(
      { userId: user._id },
      { $set: { isActive: false } }
    )

    // start a new conversation on login
    const conversation = await Conversation.create({ userId: user._id })

    res.status(200).json({
      msg: 'Login Successful',
      user,
      token,
      conversationId: conversation._id,
    })
  } catch (err) {
    console.log('login error', err)
    res.status(500).json({ error: 'login failed' })
  }
}
