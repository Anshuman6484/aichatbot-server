import axios from 'axios'

export const callAI = async (prompt) => {
  const response = await axios.post(
    `${process.env.API_URL}`,
    {
      model: `${process.env.AI_MODEL}`,
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data.choices[0].message.content
}
