const express = require('express')
const app = express()
const port = 5000

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

// application/x-wwww-form-urlencoded, application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// 환경변수 로딩
if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: path.resolve(__dirname, './config/.env.production'),
  })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.resolve(__dirname, './config/.env.development'),
  })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connect...'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕하세용!!!!!')
})

// Router 적용
app.use('/api/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
