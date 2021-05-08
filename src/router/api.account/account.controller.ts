/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Post, Req, Request, UseInterceptors } from '@nestjs/common'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import AccountService from './account.service'

@Controller('api/account')
@UseInterceptors(CatchErrorInterceptor, SuccessResInterceptor)
export class AccountController {

  constructor (private readonly accountService: AccountService) {
    //
  }

  @Post('/login')
  async login (@Req() req: Request) : Promise<unknown> {
    return await this.accountService.$login(req.body as any)
  }

  @Post('/check')
  async check (@Req() req: Request) : Promise<unknown> {
    return await this.accountService.$check(req.body as any)
  }

}

export default AccountController
