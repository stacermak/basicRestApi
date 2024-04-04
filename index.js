import express from "express"

import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", authRoutes)
app.use("/api", postRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})