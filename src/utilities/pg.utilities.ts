import { QueryResult, Pool } from 'pg'
import { pgConfig } from 'src/config/db.config'

const pool = new Pool(pgConfig)

async function pgSqlExec <T> (sqlStr: string) : Promise<QueryResult<T>> {
  const client = await pool.connect()
  const result = await client.query(sqlStr)
  client.release()
  return result
}

export default pgSqlExec
