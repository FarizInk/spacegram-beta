import { config } from "dotenv";
import { DB } from "sqlite";

export interface DatabaseTokenType { 
  id: string,
  created_at: Date,
}

const db = new DB(config().DB_SOURCE || "db.sqlite");
db.execute(`
  CREATE TABLE IF NOT EXISTS tickets (
    id STRING(50) PRIMARY KEY,
    created_at STRING(10)
  )
`);

export default db;