import { Injectable } from '@nestjs/common'
import { IAccountCheckDto, IAccountCheckResultDto, IAccountInfoDto, IAccountInsertDto, IAccountLoginDto, IAccountLoginResultDto, IAccountUpdateDto } from 'src/dtos/account.dtos'
import { createError, ErrorType } from 'src/model/res.model'
import { baseUtils, cryptoUtils, regUtils } from '@xizher/js-utils'
import ext from '@xizher/js-ext'
import pgSqlExec from '@xizher/pg'
import { checkToekn, createToken } from 'src/token'

@Injectable()
export class AccountService {

  private _tableName = 'tb_account'

  private async checkHasEmail (email: string) : Promise<boolean> {
    const sqlStr = `select count(*) from ${this._tableName} where email = '${email}'`
    const result = await pgSqlExec(sqlStr)
    const count = result.rows[0]['count']
    return count !== '0'
  }

  private async checkHasUsername (username: string) : Promise<boolean> {
    const sqlStr = `select count(*) from ${this._tableName} where username = '${username}'`
    const result = await pgSqlExec(sqlStr)
    const count = result.rows[0]['count']
    return count !== '0'
  }

  private checkIsUsername (username: string) : boolean {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
    return reg.test(username)
  }

  private

  public async addAccount (dto: IAccountInsertDto) : Promise<IAccountInfoDto> {
    const id = baseUtils.createGuid(), createTime = Date.now()
    if (!regUtils.testEmail(dto.email)) {
      return Promise.reject(ErrorType.INPUT_ERROR)
    }
    if (!this.checkIsUsername(dto.username)) {
      return Promise.reject(ErrorType.INPUT_ERROR)
    }
    if (await this.checkHasEmail(dto.email)) {
      return createError('0x100', '当前邮箱已被注册')
    }
    if (await this.checkHasUsername(dto.username)) {
      return createError('0x100', '当前用户名已被注册')
    }
    const sqlStr = `
      insert into ${this._tableName} (username, email, password, id, createtime)
        values (
          '${dto.username}', '${dto.email}', '${cryptoUtils.encrypto(dto.password)}', '${id}', '${createTime}'
        )
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return {
      id,
      username: dto.username,
      email: dto.email,
      createTime: ext(createTime).toDateFormat('yyyy/MM/dd hh:mm:ss')
    }
  }

  public async modityAccount (dto: IAccountUpdateDto) : Promise<IAccountInfoDto> {
    const updateStrList = []
    if (dto.email) {
      if (!regUtils.testEmail(dto.email)) {
        return Promise.reject(ErrorType.INPUT_ERROR)
      }
      if (await this.checkHasEmail(dto.email)) {
        return createError('0x100', '当前邮箱已被注册')
      }
      updateStrList.push(`email = '${dto.email}'`)
    }
    if (dto.username) {
      if (!this.checkIsUsername(dto.username)) {
        return Promise.reject(ErrorType.INPUT_ERROR)
      }
      if (await this.checkHasUsername(dto.username)) {
        return createError('0x100', '当前用户名已被注册')
      }
      updateStrList.push(`username = '${dto.username}'`)
    }
    if (dto.password) {
      updateStrList.push(`password = '${cryptoUtils.encrypto(dto.password)}'`)
    }
    let sqlStr = `
      update ${this._tableName}
        set ${updateStrList.join(', ')}
        where id = '${dto.id}'
    `
    let result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    sqlStr = `select * from ${this._tableName} where id = '${dto.id}'`
    result = await pgSqlExec(sqlStr)
    const account = result.rows[0]
    return {
      id: account['id'],
      username: account['username'],
      email: account['email'],
      createTime: ext(account['createtime'] as number).toDateFormat('yyyy/MM/dd hh:mm:ss'),
    }
  }

  public async loginAccount (dto: IAccountLoginDto) : Promise<IAccountLoginResultDto> {
    const { password, account } = dto
    const sqlStr = `select id, username, email, createTime from ${this._tableName}
      where (username = '${account}' or email = '${account}') and password = '${cryptoUtils.encrypto(password)}'
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

  public async checkAccount (dto: IAccountCheckDto) : Promise<IAccountCheckResultDto> {
    const success = await checkToekn(dto.id, dto.token)
    if (!success) {
      return { success }
    }
    const result = await pgSqlExec<IAccountInfoDto>(`select username, email, createtime, id from ${this._tableName} where id = '${dto.id}'`)
    return {
      success,
      account: result.rows[0]
    }
  }

}
