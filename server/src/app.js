const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { privRouter, userRouter } = require('./routes/index');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');
require('dotenv').config();
const { CLIENT_URL } = process.env;

const app = express();
console.log('CLIENT_URL:', CLIENT_URL);
// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configurar CORS para permitir solo el origen específico
app.use(cors({
    credentials: true,
    origin: CLIENT_URL, // Especifica el origen permitido en lugar de '*'
    methods: "GET, POST, OPTIONS, PUT, DELETE"
}));

app.use(morgan('dev'));

// Router
app.use('/priv', authMiddleware, privRouter);
app.use('/', userRouter);

module.exports = app;
