require('dotenv').config();
const mongoose = require('mongoose');
const Submission = require('../models/Submission');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tnp-portal').then(async () => {
  console.log("Connected to MongoDB");
  try {
    const submissions = await Submission.find({ companyName: "Unknown Company" });
    console.log(`Found ${submissions.length} submissions with Unknown Company.`);
    
    let count = 0;
    for (let sub of submissions) {
      if (sub.formData && sub.formData.companyName) {
        sub.companyName = sub.formData.companyName;
        await sub.save();
        count++;
      }
    }
    console.log(`Successfully updated ${count} submissions.`);
  } catch (error) {
    console.error("Error updating submissions:", error);
  } finally {
    mongoose.connection.close();
  }
}).catch(err => {
  console.error("MongoDB connection error:", err);
});
