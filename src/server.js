const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productOrderRoutes = require('./routes/productOrderRoutes');
const app = express();

app.use(bodyParser.json());

// Habilita CORS para cualquier origen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // * significa que cualquier origen es permitido
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cors({ origin: 'http://142.93.190.128' }));
// Rutas para autenticación
app.use('/api/auth', authRoutes);


app.use('/api', productOrderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
