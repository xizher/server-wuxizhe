import { Module } from '@nestjs/common'
import AccountController from './router/api.account/account.controller'
import AccountSerivce from './router/api.account/account.service'

@Module({
  imports: [],
  controllers: [
    AccountController,
  ],
  providers: [
    AccountSerivce,
  ],
})
export class AppModule {}
