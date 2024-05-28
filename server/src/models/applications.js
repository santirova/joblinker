const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    link: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    technologies: {
        type: [String],
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:"Pendiente",
    },
    note: {
        type: String
    },
    level: {
        type: String,
        required: true
    }
    },
    {timestamps:true}
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = { Application }
