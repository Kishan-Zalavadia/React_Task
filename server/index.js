const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./src/module/user/userRoute')
const port = 3000

app.use(cors());
app.use(express.json())
app.use('/user/', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})