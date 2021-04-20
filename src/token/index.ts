import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'

const tableName = 'tb_token'
export const minutes30 = 1000 * 60 * 30
export const minutes15 = 1000 * 60 * 15
export const minutes5 = 1000 * 60 * 5

export async function createToken (accountId: string) : Promise<string> {
  const token = baseUtils.createGuid()
  const expired = Date.now() + minutes5
  const sqlStr = `insert into ${tableName} (accountid, token, expired)
    values ('${accountId}', '${token}', ${expired})
    on conflict (accountid)
    do update set token = '${token}', expired = ${expired}
  `
  await pgSqlExec(sqlStr)
  return token
}

// export async function checkToekn (accountId: string, token: string) : Promise<boolean> {
//   let sqlStr = `select * from ${tableName}
//     where accountid = '${accountId}' and token = '${token}'
//   `
//   const result = await pgSqlExec<{ expired: string }>(sqlStr)
//   if (result.rowCount !== 1) {
//     return false
//   }
//   const { expired } = result.rows[0]
//   const now = Date.now()
//   if (Number(expired) < now) {
//     return false
//   }
//   sqlStr = `update ${tableName}
//     set expired = ${now + minutes5}
//     where accountid = '${accountId}'
//   `
//   return true
// }
