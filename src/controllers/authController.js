const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de importar el modelo correcto para los usuarios


login = async (req, res) => {
  // Aquí realizarías la autenticación del usuario
  const { username, email, password } = req.body;
  const user = { email: email, username: username, password:password }; // Supongamos que el usuario se autentica correctamente
  const existingUser = await User.findOne({ where: { email } });
  const token = jwt.sign({ userId: existingUser.id }, 'tu_secreto', { expiresIn: '1h' });
  res.json({ token });
};

register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario en la base de datos
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
  
      // Generar un token JWT para el nuevo usuario
      const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });
  
      // Enviar el token y los detalles del usuario como respuesta
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  login,
  register
};
