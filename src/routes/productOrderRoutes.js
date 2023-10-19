const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');


router.use(verifyToken); // Middleware para verificar token en rutas de productos y órdenes

router.get('/products', productController.getProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/createProduct', productController.createProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);


router.get('/orders', orderController.getOrders);
router.get('/getOrdersById/:id', orderController.getOrderById);
router.put('/createOrders', orderController.createOrder);
router.delete('/deleteOrders/:id', orderController.deleteOrder);
module.exports = router;
