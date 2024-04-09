const nodemailer = require('nodemailer')
require('dotenv').config()
const { EMAIL, EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
})

const sendWelcomeEmail = (email) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Bienvenido a JobLinker',
        text: 'Gracias por registrarte en JobLinker. ¡Esperamos que disfrutes de nuestros servicios!'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error)
        } else {
            console.log('Correo de bienvenida enviado:', info.response)
        }
    })
}

const sendPasswordResetEmail = (email, token) => {
    const resetPasswordLink = `http://tu_frontend_url/reset-password/${token}`
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `<p>Recibiste este correo porque solicitaste restablecer tu contraseña en MisFinanzas. Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${resetPasswordLink}">${resetPasswordLink}</a>
      <p>Si no solicitaste restablecer tu contraseña, ignora este correo y tu contraseña seguirá siendo la misma.</p>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return { message: 'Error al enviar el correo de restablecimiento de contraseña', error }
        } else {
            return { message: 'Correo de restablecimiento de contraseña enviado', info: info.response }
        }
    })
}
module.exports = { sendWelcomeEmail, sendPasswordResetEmail }
