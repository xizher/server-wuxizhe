import { Module } from '@nestjs/common'
import { AccountController } from './controllers/account.controller'
import { MoneyController } from './controllers/money.contorller'
import { AccountService } from './services/account.services'
import { MoneyService } from './services/money.services'

@Module({
  imports: [],
  controllers: [
    AccountController,
    MoneyController,
  ],
  providers: [
    AccountService,
    MoneyService,
  ],
})
export class AppModule {}
