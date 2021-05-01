import { Controller, Get, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { PwdService } from 'src/services/pwd.services'

@Controller('/api/pwd')
export class PwdController {

  constructor (private readonly pwdService: PwdService) {
    // nothing
  }

  @Get('/list')
  async listAll () : Promise<unknown> {
    try {
      return new SuccessModel(await this.pwdService.listPwds()) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/add')
  async add (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.pwdService.addPwd(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/modity')
  async delete (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.pwdService.modityPwd(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

}
