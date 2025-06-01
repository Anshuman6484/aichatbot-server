import { callAI } from '../services/aiservice.js'

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ msg: 'Please provide a prompt' })
    }
    const output = await callAI(prompt)
    res.status(200).json({ output })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
