const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();
connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  }
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
    brand: 'AudioTech',
    featured: true,
    images: ['https://via.placeholder.com/300']
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    brand: 'TechWear',
    featured: true,
    images: ['https://via.placeholder.com/300']
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 89.99,
    category: 'Sports',
    stock: 100,
    brand: 'SportPro',
    images: ['https://via.placeholder.com/300']
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Premium cotton t-shirt, available in multiple colors',
    price: 24.99,
    category: 'Clothing',
    stock: 200,
    brand: 'FashionCo',
    images: ['https://via.placeholder.com/300']
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 79.99,
    category: 'Home',
    stock: 40,
    brand: 'BrewMaster',
    images: ['https://via.placeholder.com/300']
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await User.create(users);
    await Product.create(products);

    console.log('✅ Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
