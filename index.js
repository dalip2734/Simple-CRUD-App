const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello From NODE API Server updated');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: error.message });
  }
});
//get request by id

app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch {
    res.status(500).json({ message: error.message });
  }
});

// create a Product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a Product
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Product
app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted succesfully' });
  } catch {
    res.status(500).json({ message: error.message });
  }
});


//Data base MongoDB
mongoose
  .connect(
    'mongodb+srv://dalip01:nwosNBu777jCBpsX@backenddb.1ep2mug.mongodb.net/Node-API?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
      console.log('SERVER is running on port 3000');
    });
  })
  .catch(() => {
    console.log('Connection failed');
  });
