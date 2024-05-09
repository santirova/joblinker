const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')


const app = express()
// Middlewares
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(cookieParser())

// Router
app.use('/', router)

module.exports = app
