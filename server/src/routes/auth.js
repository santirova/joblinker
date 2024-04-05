const {Router} = require('express');
const { postUserHandler, loginHandler } = require('../handlers/authHandlers');

const authRouter = Router();

authRouter.post('/register',postUserHandler)
authRouter.get('/login',loginHandler)

module.exports = authRouter