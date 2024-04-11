const { Application } = require('../models/applications')
const { User } = require('../models/users')

const postApplication = async (body) => {
    const user = await User.findById(body.user)
    if (!user) {
        throw new Error('User not found')
    } else {
        const newApplication = new Application(body)
        await newApplication.save()
        return newApplication
    }
}
const updateApplication = async (userId, applicationId, data) => {
    const application = await Application
        .findOne({ _id: applicationId })
        .populate({
            path: 'user',
            model: User,
            select: '_id'
        })
    if (application.user._id.toString() === userId) {
        const newApplication = await Application.findByIdAndUpdate(applicationId, data, { returnDocument: 'after' })
        return newApplication
    } else {
        throw new Error('Wrong user, user must be the creator of the application')
    }
}

const deleteApplication = async (userId, applicationId) => {
    const application = await Application
        .findOne({ _id: applicationId })
        .populate({
            path: 'user',
            model: User,
            select: '_id'
        })
    if (application.user._id.toString() === userId) {
        await Application.findByIdAndDelete(applicationId)
        return 'Successfully deleted'
    } else {
        throw new Error('Wrong user, user must be the creator of the application')
    }
}

const getApplicationsByUser = async (userId) => {
    const applications = Application.find({ user: userId })
    return applications
}
module.exports = { postApplication, updateApplication, deleteApplication, getApplicationsByUser }
