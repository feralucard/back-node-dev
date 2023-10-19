const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productOrderRoutes = require('./routes/productOrderRoutes');
const app = express();

app.use(bodyParser.json());

// Rutas para autenticación
app.use('/api/auth', authRoutes);

app.use('/api', productOrderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
