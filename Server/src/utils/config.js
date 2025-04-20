import dotenv from 'dotenv';

dotenv.config();

class Config {
  constructor() {
    this.connectionString = process.env.MONGO_DB_URI;
  }
}

const config = new Config();

export default config;