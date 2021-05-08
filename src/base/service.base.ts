/* eslint-disable @typescript-eslint/ban-types */

import { Injectable } from '@nestjs/common'
import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { QueryResult } from 'pg'
import { QueryListResultDTO, QueryListDTO } from './dtos.base'

@Injectable()
export class ServiceBase {

  //#region 保护属性

  /** 基础数据库表 */
  protected baseTable_: string

  //#endregion

  //#region 构造函数

  constructor (baseTable: string) {
    this.baseTable_ = baseTable
  }

  //#endregion

  //#region 保护方法

  protected async initQueryListAction_ <T> (options: QueryListDTO = {}) : Promise<QueryResult<T>> {
    const { pageIndex, pageSize, orders } = options
    let sqlStr = `select * from ${this.baseTable_}`
    if (orders) {
      sqlStr = `${sqlStr} order by ${(JSON.parse(orders)).map(item => `${item.name} ${item.type}`).join(',')}`
    }
    if (!isNaN(pageIndex) && !isNaN(pageSize)) {
      sqlStr = `${sqlStr} limit ${pageSize} offset ${pageIndex * pageSize}`
    }
    return await pgSqlExec<T>(sqlStr)
  }

  protected async initInsertAction_ <T> (insertObj: Object) : Promise<QueryResult<T>> {
    const id = baseUtils.createGuid()
    /* eslint-disable @typescript-eslint/indent */
    const sqlStr = `
      insert into ${this.baseTable_} (
        id, ${Object.keys(insertObj).join(',')}
      ) values ( '${id}',
        ${
          Object.values(insertObj).map(value => {
            if (typeof value === 'string') {
              return `'${value}'`
            }
            return value
          }).join(',')
        }
      )
    `
    /* eslint-enable @typescript-eslint/indent */
    return await pgSqlExec(sqlStr)
  }

  protected async initModityAction_ <T> (id: string, modityObj: Object) : Promise<QueryResult<T>> {
    const updateList = []
    Object.entries(modityObj).forEach(([field, value]) => {
      let val = value
      if (typeof val === 'string') {
        val = `'${val}'`
      }
      updateList.push(`${field} = ${val}`)
    })
    const sqlStr = `
      update ${this.baseTable_} set ${updateList.join(',')}
        where id = '${id}'
    `
    return await pgSqlExec(sqlStr)
  }

  protected async initDeleteAction_ (id: string) : Promise<QueryResult> {
    const sqlStr = `
      delete from ${this.baseTable_} where id = '${id}'
    `
    return await pgSqlExec(sqlStr)
  }

  //#endregion

  //#region 公有方法

  public async $list <T> (options: QueryListDTO) : Promise<QueryListResultDTO<T>> {
    const result = await this.initQueryListAction_<T>(options)
    return {
      total: result.rowCount,
      items: result.rows,
    }
  }

  public async $insert <T> (insertObj: Object) : Promise<true> {
    const result = await this.initInsertAction_<T>(insertObj)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  public async $modity (modityObj: Object & { id: string }) : Promise<true> {
    const { id, ...nModityObj } = modityObj
    const result = await this.initModityAction_(id, nModityObj)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  public async $delete (deleteObj: { id: string }) : Promise<true> {
    const result = await this.initDeleteAction_(deleteObj.id)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  //#endregion

}

export default ServiceBase
