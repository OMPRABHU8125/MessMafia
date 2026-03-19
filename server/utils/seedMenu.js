const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Menu = require('../models/Menu');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await connectDB();

    // Read menu.json from the frontend data folder
    const menuPath = path.join(__dirname, '../../data/menu.json');
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

    // Transform and clean data if necessary
    const formattedData = menuData.map(item => ({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      preparationTime: item.prepTime || '15 min',
      isAvailable: item.available ?? true
    }));

    await Menu.deleteMany(); // Clear existing
    await Menu.insertMany(formattedData);

    console.log('Menu Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
