const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const corsMiddleware = require('./middleware/cors.middleware')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const filePathMiddleware = require('./middleware/filePath.middleware')
const path = require('path')

const app = express()
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
const PORT = process.env.PORT || config.get('serverPort')

app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/file', fileRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()