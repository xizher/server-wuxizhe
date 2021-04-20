import { Injectable } from '@nestjs/common'
import pgSqlExec from '@xizher/pg'
import {
  IAccountInfoDto,
  IAddAccountDto,
} from 'src/dtos/account.dtos'
import { createError, ErrorType } from 'src/model/res.model'
import { baseUtils, regUtils } from '@xizher/js-utils'
// import { IAccountCheckDto, IAccountCheckResultDto, IAccountInfoDto, IAccountInsertDto, IAccountLoginDto, IAccountLoginResultDto, IAccountUpdateDto } from 'src/dtos/account.dtos'
// import { createError, ErrorType } from 'src/model/res.model'
// import { baseUtils, cryptoUtils, regUtils } from '@xizher/js-utils'
// import ext from '@xizher/js-ext'
// import pgSqlExec from '@xizher/pg'
// import { checkToekn, createToken } from 'src/token'

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
    const password = escape(dto.password)
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

  //#endregion

  // public async loginAccount (dto: IAccountLoginDto) : Promise<IAccountLoginResultDto> {
  //   const { password, account } = dto
  //   const sqlStr = `select id, username, email, createTime from ${this._tableName}
  //     where (username = '${account}' or email = '${account}') and password = '${cryptoUtils.encrypto(password)}'
  //   `
  //   const result = await pgSqlExec<IAccountInfoDto>(sqlStr)
  //   let token = null
  //   let success = false
  //   if (result.rowCount === 1) {
  //     success = true
  //     token = await createToken(result.rows[0].id)
  //   }
  //   return {
  //     token, success,
  //     account: result.rows[0]
  //   }
  // }

  // public async checkAccount (dto: IAccountCheckDto) : Promise<IAccountCheckResultDto> {
  //   const success = await checkToekn(dto.id, dto.token)
  //   if (!success) {
  //     return { success }
  //   }
  //   const result = await pgSqlExec<IAccountInfoDto>(`select username, email, createtime, id from ${this._tableName} where id = '${dto.id}'`)
  //   return {
  //     success,
  //     account: result.rows[0]
  //   }
  // }

}
