import express from 'express'

import prsRoute from './routes/prs'

const app = express()
app.use(express.json()) // Middleware that turns req.body to json

app.use('/api/prs', prsRoute)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
