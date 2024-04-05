const {Router} = require('express');
const { postUserHandler } = require('../handlers/authHandlers');

const authRouter = Router();

authRouter.post('/register',postUserHandler)


module.exports = authRouter