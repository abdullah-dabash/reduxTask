// seed.js

const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path if needed
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample product data
const products = [
  {
    name: 'Gaming Chair',
    price: 199.99,
    description: 'Ergonomic gaming chair with adjustable armrests and lumbar support.',
  },
  {
    name: 'Gaming Desk',
    price: 299.99,
    description: 'Large gaming desk with built-in cable management and RGB lighting.',
  },
  {
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB mechanical keyboard with customizable keys and macro support.',
  },
  {
    name: 'Gaming Mouse',
    price: 89.99,
    description: 'High-precision gaming mouse with adjustable DPI and customizable buttons.',
  },
  {
    name: 'Monitor Stand',
    price: 49.99,
    description: 'Adjustable monitor stand with tilt and height adjustments.',
  },
];

// Function to seed the database
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products removed.');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedProducts();
