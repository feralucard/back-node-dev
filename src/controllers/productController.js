const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    
    products.forEach(element => {
      try {
        // Leer la imagen del sistema de archivos
        const imageBuffer = fs.readFileSync(path.join(__dirname, 'uploads', element.image));
        const base64Image = imageBuffer.toString('base64');
        element.image = base64Image;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la imagen' });
      }
    });
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
      try {
        // Leer la imagen del sistema de archivos
        const imageBuffer = fs.readFileSync(path.join(__dirname, 'uploads', element.image));
        const base64Image = imageBuffer.toString('base64');
        element.image = base64Image;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la imagen' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createProduct = async (req, res) => {
  let { name, price, image, marca } = req.body;
  const buffer = Buffer.from(image, 'base64');
  // Guardar la imagen en el sistema de archivos
  const imageFilename = `${Date.now()}.png`;
  fs.writeFileSync(path.join(__dirname, 'uploads', imageFilename), buffer);
  // Guardar la ruta de la imagen en la base de datos
  image = `${imageFilename}`;
  console.log(image);
  try {
    const product = await Product.create({ name, price, image, marca });
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
