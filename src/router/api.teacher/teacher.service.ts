import { Injectable } from '@nestjs/common'
import pgSqlExec from '@xizher/pg'
import ServiceBase from 'src/base/service.base'
import { AddTicketDTO } from './teacher.dto'

@Injectable()
export class TeacherSerivce extends ServiceBase {

  constructor () {
    super('tb_teacher')
  }

  public async $addTicket (dto: AddTicketDTO) : Promise<true> {
    const ids = dto.ids
    const sqlStr = `
      update tb_teacher set ticket = ticket + 1 where ${ids.map(id => `id = '${id}'`).join(' or ')}
    `
    await pgSqlExec(sqlStr)
    return true
  }

}
