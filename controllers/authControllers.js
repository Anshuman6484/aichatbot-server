import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })

    const token = createToken(user._id)

    res.status(201).json({ msg: 'Signup Successful', user, token })
  } catch (err) {
    console.log(err)
  }
}

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
    res.status(200).json({ msg: 'Login Successful', user, token })
  } catch (err) {
    console.log(err)
  }
}
