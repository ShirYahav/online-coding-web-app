import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

class Config {
  constructor() {
    this.connectionString = process.env.MONGO_DB_URI;
    if (!this.connectionString) {
      throw new Error(`Missing MONGO_DB_URI in ${envFile}`);
    }
  }
}

const config = new Config();

export default config;
