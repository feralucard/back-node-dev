const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');


router.use(verifyToken); // Middleware para verificar token en rutas de productos y órdenes
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // * significa que cualquier origen es permitido
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

router.get('/products', productController.getProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/createProduct', productController.createProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);


router.get('/orders', orderController.getOrders);
router.get('/getOrdersById/:id', orderController.getOrderById);
router.put('/createOrders', orderController.createOrder);
router.delete('/deleteOrders/:id', orderController.deleteOrder);
module.exports = router;
