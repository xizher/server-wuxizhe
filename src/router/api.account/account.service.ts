import { Injectable } from '@nestjs/common'
import SerivceBase from 'src/base/service.base'
import pgSqlExec from '@xizher/pg'
import { cryptoUtils } from '@xizher/js-utils'
import { AccountInfoDTO, AccountLoginDTO, AccountLoginResultDTO, TokenDTO } from './account.dto'
import { createToken, getAndCheckAccountByToken } from 'src/token'
import { createError } from 'src/model/res.model'

@Injectable()
export class AccountSerivce extends SerivceBase {

  //#region 构造函数

  constructor () {
    super('tb_account')
  }

  //#endregion

  //#region 公有方法

  public async $login (dto: AccountLoginDTO) : Promise<AccountLoginResultDTO> {
    const { password, account } = dto
    const sqlStr = `
      select id, username, email
        from ${this.baseTable_}
        where (username = '${account}' or email = '${account}') and password = '${cryptoUtils.encrypto(escape(password))}'
    `
    const result = await pgSqlExec<AccountInfoDTO>(sqlStr)
    if (result.rowCount !== 1) {
      return { success: false }
    }
    const accountInfo = result.rows[0]
    const token = await createToken(accountInfo.id)
    return {
      success: true,
      token,
      account: accountInfo,
    }
  }

  public async $check (dto: TokenDTO) : Promise<AccountInfoDTO> {
    const account = await getAndCheckAccountByToken(dto.token)
    if (!account) {
      return createError('0x101', 'Token已失效，请重新登录', '用户已过期，请重新登录')
    }
    return account
  }

  //#endregion

}

export default AccountSerivce
