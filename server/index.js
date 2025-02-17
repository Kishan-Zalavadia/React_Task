const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./src/module/user/userRoute')
const blogRoutes = require('./src/module/blog/blogRoute')
const commentRoutes = require('./src/module/comment/commentRoute')
const reactionRoutes = require('./src/module/reaction/reactionRoute')
const port = 3000

app.use(cors());
app.use(express.json())
app.use('/user/', userRoutes)
app.use('/blog/', blogRoutes)
app.use('/comment/',commentRoutes)
app.use('/reaction/',reactionRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})