import { Injectable } from '@nestjs/common'
import ServiceBase from 'src/base/service.base'
import pgSqlExec from '@xizher/pg'
import { cryptoUtils } from '@xizher/js-utils'
import { AccountInfoDTO, AccountLoginDTO, AccountLoginResultDTO, TokenDTO } from './account.dto'
import { createToken, getAndCheckAccountByToken } from 'src/token'
import { createError, ErrorType } from 'src/model/res.model'

@Injectable()
export class AccountService extends ServiceBase {

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
      return createError(ErrorType.TOKEN_ERROR)
    }
    return account
  }

  //#endregion

}

export default AccountService
