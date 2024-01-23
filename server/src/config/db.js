const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()

const connectDB = async () => {
   try {
      const mongoURI = process.env.MONGODB_URI
      const conn = await mongoose.connect(mongoURI, { dbName: process.env.DB_NAME });

      console.log(`Server is Connected to MongDB`);
   } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
   }
};

module.exports = connectDB;