/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import AccountSerivce from './account.service'

@Controller('api/account')
export class AccountController {

  constructor (private readonly accountService: AccountSerivce) {
    //
  }

  @Post('/login')
  async login (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.$login(req.body as any))
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/check')
  async check (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.accountService.$check(req.body as any))
    } catch (error) {
      return new ErrorModel(error)
    }
  }

}

export default AccountController
