const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {privRouter,userRouter} = require('./routes/index')
const cookieParser = require('cookie-parser')
const { authMiddleware } = require('./middlewares/authMiddleware')
require('dotenv').config()
const app = express()
// Middlewares
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))
app.use(cookieParser())

// Router
app.use('/priv',authMiddleware, privRouter)
app.use('/', userRouter)
module.exports = app
