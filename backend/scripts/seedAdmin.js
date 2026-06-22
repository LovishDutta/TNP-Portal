const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tnp-portal');
    console.log('MongoDB connected for seeding');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123' // Will be hashed by pre-save middleware
    });

    await admin.save();
    console.log('Default admin user created successfully (username: admin, password: admin123)');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
