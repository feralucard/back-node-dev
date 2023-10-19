const connection = require('../db');

const getProducts = (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

const createOrder = (req, res) => {
  const { productId } = req.body;
  const userId = req.userId; // Obtener el userId del token JWT

  const order = {
    product_id: productId,
    user_id: userId
    // ... más detalles de la orden si es necesario
  };

  connection.query('INSERT INTO orders SET ?', order, (error, results) => {
    if (error) throw error;
    res.json(order);
  });
};

module.exports = {
  getProducts,
  createOrder
};
