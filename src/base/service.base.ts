import { Injectable } from '@nestjs/common'

@Injectable()
export class SerivceBase {

  //#region 保护属性

  /** 基础数据库表 */
  protected baseTable_: string

  //#endregion

  //#region 构造函数

  constructor (baseTable: string) {
    this.baseTable_ = baseTable
  }

  //#endregion

}

export default SerivceBase
