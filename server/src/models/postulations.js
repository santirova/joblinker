const mongoose = require('mongoose')

const postulationSchema = new mongoose.Schema({
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
        required: true
    },
    note: {
        type: String
    },
    level: {
        stype: String,
        required: true
    },
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Postulation', postulationSchema)
