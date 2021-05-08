import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { AccountInfoDTO } from 'src/router/api.account/account.dto'

export const minutes30 = 1000 * 60 * 30
export const minutes15 = 1000 * 60 * 15
export const minutes5 = 1000 * 60 * 5

export async function createToken (accountId: string) : Promise<string> {
  const token = baseUtils.createGuid()
  const expired = Date.now() + minutes15
  const sqlStr = `insert into tb_token (accountid, token, expired)
    values ('${accountId}', '${token}', ${expired})
    on conflict (accountid)
    do update set token = '${token}', expired = ${expired}
  `
  await pgSqlExec(sqlStr)
  return token
}

export async function getAndCheckAccountByToken (token: string) : Promise<AccountInfoDTO | false> {
  const sqlStr = `
    select * from v_account_token
      where token = '${token ?? ''}'
  `
  const result = await pgSqlExec<{ expired: string } & AccountInfoDTO>(sqlStr)
  if (result.rowCount !== 1 || Number(result.rows[0].expired) < Date.now()) {
    return false
  }
  await updateToken(token)
  return {
    id: result.rows[0].id,
    username: result.rows[0].username,
    email: result.rows[0].email,
  }
}

export async function updateToken (token: string) : Promise<void> {
  const sqlStr = `
    update tb_token set expired = ${Date.now() + minutes5}
      where token = '${token}'
  `
  await pgSqlExec(sqlStr)
}
