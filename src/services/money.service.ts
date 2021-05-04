import { Injectable } from '@nestjs/common'
import pgSqlExec from '@xizher/pg'
import { IAddMoneyDot, IDeleteMoneyDto, IMoneyDto, IMoneyFormatDto } from 'src/dtos/money.dto'
import { getAccountByToken } from '../token'
import ext from '@xizher/js-ext'
import { baseUtils } from '@xizher/js-utils'

@Injectable()
export class MoneyService {

  //#region 私有属性

  private _tableName = 'tb_money'

  //#endregion

  //#region 私有方法

  //#endregion

  //#region 公有属性

  public async listMoney (token: string) : Promise<IMoneyFormatDto[]> {
    await getAccountByToken(token)
    const sqlStr = `
      select * from ${this._tableName}
    `
    const result = await pgSqlExec<IMoneyDto>(sqlStr)
    return result.rows.map(item => {
      return {
        ...item,
        value: Number(item.value),
        time: Number(item.time),
        timeFormat: ext(Number(item.time)).toDateFormat('yyyy/MM/dd hh:mm:ss')
      }
    })
  }

  public async addMoney (dto: IAddMoneyDot, token: string) : Promise<true> {
    await getAccountByToken(token)
    const { type, value, lonlat, comment } = dto
    const time = Date.now()
    const id = baseUtils.createGuid()
    const sqlStr = `
      insert into ${this._tableName} (
        id, type, value, lonlat, comment, time
      ) values (
        '${id}', '${type}', ${value}, '${lonlat ?? ''}', '${comment ?? ''}', ${time}
      )
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  public async deleteMoney (dto: IDeleteMoneyDto, token: string) : Promise<true> {
    await getAccountByToken(token)
    const ids = Array.isArray(dto.ids) ? dto.ids : [dto.ids]
    const sqlStr = `
      delete from ${this._tableName}
        where ${ids.map(id => `id = '${id}'`).join(' or ')}
    `
    await pgSqlExec(sqlStr)
    return true
  }

  //#endregion

}
