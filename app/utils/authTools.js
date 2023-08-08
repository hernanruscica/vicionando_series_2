const jwt = require('jsonwebtoken');
const secretKey =  process.env.SECRET_KEY;

module.exports = {
    verificarToken: (req, res, next) => {
    const token = req.headers.authorization;
    console.log("verficar token")
  
    if (!token) {
        console.log('Token no proporcionado');
      return res.status(401).json({ message: 'Token no proporcionado' });      
    }
  
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        console.log('Token inválido');
        return res.status(401).json({ message: 'Token inválido' });
      }
  
      req.userId = decoded.userId; // Agregar los datos decodificados a la solicitud
      next();
    });
  }
}