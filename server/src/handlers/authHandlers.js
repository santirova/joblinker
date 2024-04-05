const {postUserController} = require('../controllers/authController')

const postUserHandler = async (req, res) => {
    const { user, password, email, phone, photo } = req.body;
    try {
        const newUser = await postUserController(user, password, email,phone,photo);
        // sendWelcomeEmail(email); 
        res.status(200).send(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({ error: 'El correo electrónico ya está en uso.' });
        } else {
            res.status(500).send({ error: error.message });
        }
    }
};

module.exports = {postUserHandler}