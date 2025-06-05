import { callAI } from '../services/aiservice.js'

export const askAI = async (req, res) => {
  try {
    const { messages } = req.body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ msg: 'Please provide a valid messages array' })
    }
    const output = await callAI(messages)
    res.status(200).json({ output })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
