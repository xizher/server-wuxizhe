/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { QueryListDTO, QueryListResultDTO } from 'src/base/dtos.base'
import { ServiceBase } from '../../base/service.base'
import { PwdDTO, AddPwdDTO, ModityPwdDTO, DeletePwdDTO } from './pwd.dto'

@Injectable()
export class PwdService extends ServiceBase {

  //#region 构造函数

  constructor () {
    super('tb_pwd')
  }

  //#endregion

  //#region 公有方法

  public async $list <T> (options: QueryListDTO) : Promise<QueryListResultDTO<T>> {
    const { total, items } = await super.$list<PwdDTO>(options)
    return {
      total, items: items.map(item => ({
        ...item,
        name: unescape(item.name),
        comment: unescape(item.comment),
      }))
    } as any
  }

  public async $insert (dto: AddPwdDTO) : Promise<true> {
    const name = escape(dto.name)
    const comment = escape(dto.comment)
    const pwd = dto.pwd
    return await super.$insert({ name, comment, pwd })
  }

  public async $modity (dto: ModityPwdDTO) : Promise<true> {
    const { id, name, pwd, comment } = dto
    const updateObj : any = {}
    name && (updateObj.name = escape(name))
    pwd && (updateObj.pwd = pwd)
    comment && (updateObj.comment = escape(comment))
    return await super.$modity({ id, ...updateObj })
  }

  public async $delete (dto: DeletePwdDTO) : Promise<true> {
    return await super.$delete(dto)
  }

  //#endregion

}

export default PwdService
