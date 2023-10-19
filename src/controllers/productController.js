const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      await product.destroy();
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
