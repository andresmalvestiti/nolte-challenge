import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  // Este es el nombre del servicio de base de datos en docker-compose.yml
  host: 'db',
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

const query = <T extends object>(text: string, params?: any[]): Promise<QueryResult<T>> => pool.query(text, params);

export default query;