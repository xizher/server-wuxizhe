/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Post, Req, Request, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { AccountLoginDTO, TokenDTO, AccountLoginSuccessDTO, AccountLoginErrorDTO, AccountInfoDTO } from './account.dto'
import AccountService from './account.service'
@Controller('api/account')
@UseInterceptors(CatchErrorInterceptor, SuccessResInterceptor)
export class AccountController {

  constructor (private readonly accountService: AccountService) {
    //
  }

  @ApiTags('账户')
  @ApiBody({
    type: AccountLoginDTO,
    required: true,
  })
  @ApiCreatedResponse({
    type: AccountLoginSuccessDTO
  })
  @ApiCreatedResponse({
    type: AccountLoginErrorDTO
  })
  @Post('/login')
  async login (@Req() req: Request) : Promise<unknown> {
    return await this.accountService.$login(req.body as any)
  }

  @ApiTags('账户')
  @ApiBody({
    type: TokenDTO,
    required: true,
  })
  @ApiCreatedResponse({
    type: AccountInfoDTO,
    description: 'token验证失败返回false'
  })
  @Post('/check')
  async check (@Req() req: Request) : Promise<unknown> {
    return await this.accountService.$check(req.body as any)
  }

}

export default AccountController
