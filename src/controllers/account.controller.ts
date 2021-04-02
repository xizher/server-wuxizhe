import { Controller, Get, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { AccountService } from 'src/services/account.services'

@Controller('/api/account')
export class AccountController {

  constructor (private readonly accountService: AccountService) {
    // nothing
  }

  @Get('/listAll')
  async listAll () : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.getAllAccounts())
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/add')
  async add (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.addAccount(req.body as any)) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/modity')
  async modity (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.modityAccount(req.body as any)) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

}
