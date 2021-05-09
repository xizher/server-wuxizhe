import { Controller, Get, Post, Query, UseInterceptors, Body } from '@nestjs/common'
import { QueryListDTO } from 'src/base/dtos.base'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { TokenInterceptor } from 'src/token/token.interceptor'
import { AddPwdDTO, ModityPwdDTO, DeletePwdDTO } from './pwd.dto'
import PwdService from './pwd.service'

@Controller('/api/pwd')
@UseInterceptors(TokenInterceptor, CatchErrorInterceptor, SuccessResInterceptor)
export class PwdController {

  constructor (private readonly pwdService: PwdService) {
    //
  }

  @Get('/list')
  async list (@Query() query: QueryListDTO) : Promise<unknown> {
    return await this.pwdService.$list(query)
  }

  @Post('/add')
  async add (@Body() body: AddPwdDTO) : Promise<unknown> {
    return await this.pwdService.$insert(body)
  }

  @Post('/modity')
  async modity (@Body() body: ModityPwdDTO) : Promise<unknown> {
    return await this.pwdService.$modity(body)
  }

  @Post('/delete')
  async delete (@Body() body: DeletePwdDTO) : Promise<unknown> {
    return await this.pwdService.$delete(body)
  }

}

export default PwdController
