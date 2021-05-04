import { Injectable } from '@nestjs/common'
import pgSqlExec from '@xizher/pg'
import {
  IAccountInfoDto,
  IAccountLoginDto,
  IAccountLoginResultDto,
  IAddAccountDto,
} from 'src/dtos/account.dtos'
import { createError, ErrorType } from 'src/model/res.model'
import { baseUtils, cryptoUtils, regUtils } from '@xizher/js-utils'
import { createToken, getAccountByToken } from 'src/token'
import { IToken } from 'src/dtos/token.dtos'

@Injectable()
export class AccountService {

  //#region 私有属性

  private _tableName = 'tb_account'

  //#endregion

  //#region 私有方法

  private async _isUsername (username: string) : Promise<void> {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
    if (!reg.test(username)) {
      return Promise.reject(ErrorType.INPUT_ERROR)
    }
  }

  private async _hasUsername (username: string) : Promise<void> {
    const sqlStr = `select count(*) from ${this._tableName} where username = '${username}'`
    const result = await pgSqlExec(sqlStr)
    const count = Number(result.rows[0]['count'])
    if (count !== 0) {
      return createError('0x100', '当前用户名已被注册')
    }
  }

  private async _isEmail (email: string) : Promise<void> {
    if (!regUtils.testEmail(email)) {
      return Promise.reject(ErrorType.INPUT_ERROR)
    }
  }

  private async _hasEmail (email: string) : Promise<void> {
    const sqlStr = `select count(*) from ${this._tableName} where email = '${email}'`
    const result = await pgSqlExec(sqlStr)
    const count = Number(result.rows[0]['count'])
    if (count !== 0) {
      return createError('0x100', '当前邮箱已被注册')
    }
  }

  //#endregion

  //#region 公有方法

  public async addAccount (dto: IAddAccountDto) : Promise<IAccountInfoDto> {
    const { username, email } = dto
    await this._isUsername(username)
    await this._hasUsername(username)
    await this._isEmail(email)
    await this._hasEmail(email)
    const id = baseUtils.createGuid()
    const password = cryptoUtils.encrypto(escape(dto.password))
    const sqlStr = `
      insert into ${this._tableName} (
        id, username, email, password
      ) values (
        '${id}', '${username}', '${email}', '${password}'
      )
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return { id, username, email }
  }

  public async loginAccount (dto: IAccountLoginDto) : Promise<IAccountLoginResultDto> {
    const { password, account } = dto
    const sqlStr = `
      select id, username, email
        from ${this._tableName}
        where (username = '${account}' or email = '${account}') and password = '${cryptoUtils.encrypto(escape(password))}'
    `
    const result = await pgSqlExec<IAccountInfoDto>(sqlStr)
    let token = null
    let success = false
    if (result.rowCount === 1) {
      success = true
      token = await createToken(result.rows[0].id)
    }
    return {
      token, success,
      account: result.rows[0]
    }
  }

  //#endregion

  public async checkAccount (dto: IToken) : Promise<IAccountInfoDto> {
    const account = await getAccountByToken(dto.token)
    return account
  }

}
