import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { IAccountInfoDto } from 'src/dtos/account.dtos'
import { createError } from 'src/model/res.model'

export const minutes30 = 1000 * 60 * 30
export const minutes15 = 1000 * 60 * 15
export const minutes5 = 1000 * 60 * 5

export async function createToken (accountId: string) : Promise<string> {
  const token = baseUtils.createGuid()
  const expired = Date.now() + minutes5
  const sqlStr = `insert into tb_token (accountid, token, expired)
    values ('${accountId}', '${token}', ${expired})
    on conflict (accountid)
    do update set token = '${token}', expired = ${expired}
  `
  await pgSqlExec(sqlStr)
  return token
}

export async function getAccountByToken (token: string) : Promise<IAccountInfoDto> {
  const sqlStr = `
    select * from v_account_token
      where token = '${token}'
  `
  const result = await pgSqlExec<{ expired: string } & IAccountInfoDto>(sqlStr)
  if (result.rowCount !== 1 || Number(result.rows[0].expired) < Date.now()) {
    return createError('0x101', 'Token已失效，请重新登录', '用户已过期，请重新登录')
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
