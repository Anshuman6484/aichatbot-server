import axios from 'axios'

export const callAI = async (messages) => {
  const response = await axios.post(
    `${process.env.API_URL}`,
    {
      model: `${process.env.AI_MODEL}`,
      messages,
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
