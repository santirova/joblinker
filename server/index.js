const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI


const app = express()

app.listen(port,() => {
    console.log(`server is running on port ${port}`)
    mongoose.connect(uri)
        .then(()=>console.log('successful connection to the database'))
        .catch((error)=> console.log(error))
})

// const schema = new mongoose.Schema({ name: String, size: String });
// const Tank = mongoose.model('Tank', schema);

app.get('/', async (req,res) => {
    res.send('primer endpoint')
})