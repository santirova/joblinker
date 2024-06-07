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
app.use(cors());

 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*'); /* https:viandaexpress.vercel.app, http:localhost:5173 */
   res.header("Access-Control-Allow-Credentials", "true");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
   next();
 });

app.use(morgan('dev'));

// Router
app.use('/priv', authMiddleware, privRouter);
app.use('/', userRouter);

module.exports = app;
