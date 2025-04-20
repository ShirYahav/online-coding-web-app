import mongoose from 'mongoose';
import config from '../utils/config.js';

async function connect() {
  try {
    const db = await mongoose.connect(config.connectionString);
    console.log("We're connected to MongoDB " + db.connection.name);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default { connect };