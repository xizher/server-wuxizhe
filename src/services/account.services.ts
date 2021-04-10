import { Injectable } from '@nestjs/common'
import { account } from 'src/dtos/account.dtos'
import { createError, ErrorType } from 'src/model/res.model'
import { baseUtils, cryptoUtils } from '@xizher/js-utils'
import ext from '@xizher/js-ext'
import pgSqlExec from 'src/utilities/pg.utilities'
import { testEmail } from 'src/utilities/reg.utilities'

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

  public async getAllAccounts () : Promise<account.res.IAccountInfoListDto> {
    const sqlStr = `select * from ${this._tableName}`
    const result = await pgSqlExec(sqlStr)
    const items = (result.rows as account.res.IAccountInfoDto[])
      .map(item => {
        delete item.password
        return item
      })
    const total = result.rowCount
    return { items, total }
  }

  public async addAccount (dto: account.req.IAccountInstallDto) : Promise<account.res.IAccountInfoDto> {
    const id = baseUtils.createGuid(), createTime = Date.now()
    if (!testEmail(dto.email)) {
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

  public async modityAccount (dto: account.req.IAccountUpdateDto) : Promise<account.res.IAccountInfoDto> {
    const updateStrList = []
    if (dto.email) {
      if (!testEmail(dto.email)) {
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

}
