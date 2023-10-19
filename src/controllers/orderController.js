const Order = require('../models/Order');

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Obtener una orden por su ID
exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createOrder = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const order = await Order.create({ productId, userId });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una orden por su ID
exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
  
      await order.destroy();
      res.json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
