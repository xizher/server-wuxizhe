/* eslint-disable @typescript-eslint/ban-types */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { QueryResult } from 'pg'
import { Observable } from 'rxjs'
import { getAccountByToken } from 'src/token'
import { map, tap } from 'rxjs/operators'

export interface IQueryListResult<T> {
  total: number,
  items: T[]
}

export interface IQueryListOptions {
  pageIndex?: number
  pageSize?: number
  orders?: string
  // orders?: {
  //   name: string
  //   type: 'asc' | 'desc'
  // }[]
}

@Injectable()
export class BaseInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        map(async data => {
          await getAccountByToken(context.getArgByIndex(0).headers.token)
          return data
        })
      )
  }
}

/** 基础服务类 */
export class BaseService {

  //#region 保护属性

  /** 基础表 */
  protected baseTable_: string

  //#endregion

  //#region 构造函数

  /**
   * 构造基础服务对象
   * @param baseTable 基础表
   */
  constructor (baseTable: string) {
    this.baseTable_ = baseTable
  }

  //#endregion

  //#region 保护方法

  protected async checkToken_ (token: string) : Promise<void> {
    await getAccountByToken(token)
  }

  protected async initQueryListAction_ <T> (options: IQueryListOptions = {}) : Promise<QueryResult<T>> {
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
      ) values ( ${id},
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

  //#endregion

  //#region 公有方法

  public async $queryList <T> (options: IQueryListOptions, token: string) : Promise<IQueryListResult<T>> {
    const result = await this.initQueryListAction_<T>(options)
    return {
      total: result.rowCount,
      items: result.rows
    }
  }

  public async $insertItem <T> (insertObj: Object) : Promise<true> {
    const result = await this.initInsertAction_<T>(insertObj)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  //#endregion

}
