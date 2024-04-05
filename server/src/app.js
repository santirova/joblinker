const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const router = require('./routes/index')
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Router
app.use("/", router);


module.exports = app