import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { AddTicketDTO } from './teacher.dto'
import { TeacherSerivce } from './teacher.service'

@Controller('/api/teacher')
@UseInterceptors(CatchErrorInterceptor, SuccessResInterceptor)
export class TeacherController {

  constructor (private readonly teacherService: TeacherSerivce) {
    //
  }

  @Get('/list')
  async list () : Promise<unknown> {
    return await this.teacherService.$list({ orders: [`{ "name": "id", "type": "asc" }`] })
  }

  @Post('/add')
  @ApiBody({
    type: AddTicketDTO
  })
  async add (@Body() dto: AddTicketDTO) : Promise<unknown> {
    return await this.teacherService.$addTicket(dto)
  }

}
