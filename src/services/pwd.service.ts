import { Injectable } from '@nestjs/common'
import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { IAddPwdDto, IPwdDto, IPwdListDto, IModityPwdDto } from 'src/dtos/pwd.dots'
import { getAccountByToken } from 'src/token'

@Injectable()
export class PwdService {

  //#region 素有属性

  private _tableName = 'tb_pwd'

  //#endregion

  //#region 私有方法

  //#endregion

  //#region 公有方法

  public async addPwd (dto: IAddPwdDto, token: string) : Promise<IPwdDto> {
    await getAccountByToken(token)
    const { name, pwd, comment } = dto
    const id = baseUtils.createGuid()
    const sqlStr = `
      insert into ${this._tableName} (
        id, name, pwd, comment
      ) values (
        '${id}', '${escape(name)}', '${pwd}', '${escape(comment ?? '')}'
      )
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return {
      id, name, pwd, comment
    }
  }

  public async listPwds () : Promise<IPwdListDto> {
    const sqlStr = `
      select * from ${this._tableName}
    `
    const result = await pgSqlExec<IPwdDto>(sqlStr)
    return {
      total: result.rowCount,
      items: result.rows.map(item => ({
        ...item,
        name: unescape(item.name),
        comment: unescape(item.comment),
      }))
    }
  }

  public async modityPwd (dto: IModityPwdDto, token: string) : Promise<true> {
    await getAccountByToken(token)
    const { id, name, pwd, comment } = dto
    const updateList = []
    name && updateList.push(`name = '${escape(name)}'`)
    pwd && updateList.push(`pwd = '${pwd}'`)
    comment && updateList.push(`comment = '${escape(comment)}'`)
    const sqlStr = `
      update ${this._tableName} set ${updateList.join(',')}
        where id = '${id}'
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  //#endregion

}
