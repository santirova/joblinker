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
app.use(cors({
    credentials:true,
    origin:"*",
    methods:"GET, POST, OPTIONS, PUT ,DELETE"
}));
app.use(morgan('dev'))
app.use(cookieParser())
// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://joblinker-ar.vercel.app');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// Router
app.use('/priv',authMiddleware, privRouter)
app.use('/', userRouter)
module.exports = app
