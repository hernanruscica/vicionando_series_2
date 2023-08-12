const nodemailer = require('nodemailer');

module.exports = {
    // Crear una función para enviar un correo electrónico
    sendWelcome: (data, token) => {
        console.log("enviando mail")
        // Configurar el servicio de correo electrónico
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {                
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls : { rejectUnauthorized: false }
        });    
        // Definir los detalles del correo electrónico
        let mailOptions = {
            from: 'info@ruscica-code.ar',
            to: 'cesarhernanruscica@gmail.com',
            subject: 'Registrado - ABM users API',
            html: ` <div style="font-size: 1rem">
                        <h1>ABM users API</h1>
                        <p>Hola <strong>${data.name}</strong>, bienvenido!</p>
                        <p>Se registro exitosamente en <strong>ABM users API</strong><br>
                        Ahora puede <a href="${process.env.APP_URL}/api/users/login/">Ingresar a su perfil</a><br>
                        Tambien puede aprender a usar la API <a href="${process.env.APP_URL}/api/info/">haciendo click aca.</a>
                        </p>
                        <p style="word-break: break-all;">
                            <strong>Su Token es:  </strong><br>
                            ${token}
                        </p>
                    </div>
                    `
            };    
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions);
    }   
}