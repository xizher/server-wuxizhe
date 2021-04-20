import { Controller, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { AccountService } from 'src/services/account.services'

@Controller('/api/account')
export class AccountController {

  constructor (private readonly accountService: AccountService) {
    // nothing
  }

  @Post('/add')
  async add (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.addAccount(req.body as any)) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  // @Post('/modity')
  // async modity (@Req() req: Request) : Promise<unknown> {
  //   try {
  //     return new SuccessModel(await this.accountService.modityAccount(req.body as any)) // eslint-disable-line
  //   } catch (error) {
  //     return new ErrorModel(error)
  //   }
  // }

  // @Post('/login')
  // async login (@Req() req: Request) : Promise<unknown> {
  //   try {
  //     return new SuccessModel(await this.accountService.loginAccount(req.body as any)) // eslint-disable-line
  //   } catch (error) {
  //     return new ErrorModel(error)
  //   }
  // }

  // @Post('/check')
  // async check (@Req() req: Request) : Promise<unknown> {
  //   try {
  //     return new SuccessModel(await this.accountService.checkAccount(req.body as any)) // eslint-disable-line
  //   } catch (error) {
  //     return new ErrorModel(error)
  //   }
  // }

}
