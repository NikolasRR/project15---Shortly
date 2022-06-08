import pg from 'pg';
import "dotenv/config";

const { Pool } = pg;

const user = 'postgres';
const password = process.env.SQL_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = process.env.DB_NAME;

const db = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default db;