const mongoose = require('mongoose')
const app = require('./src/app.js')
require('dotenv').config()
const { MONGO_URI, PORT } = process.env

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    mongoose.connect(MONGO_URI)
        .then(() => console.log('successful connection to the database'))
        .catch((error) => console.log(error))
})

app.get('/', async (req, res) => {
    res.send('primer endpoint')
})
