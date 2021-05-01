import { Module } from '@nestjs/common'
import { AccountController } from './controllers/account.controller'
import { BlogController } from './controllers/blog.controller'
import { MoneyController } from './controllers/money.contorller'
import { PwdController } from './controllers/pwd.controller'
import { AccountService } from './services/account.services'
import { BlogService } from './services/blog.services'
import { MoneyService } from './services/money.services'
import { PwdService } from './services/pwd.services'

@Module({
  imports: [],
  controllers: [
    AccountController,
    MoneyController,
    BlogController,
    PwdController,
  ],
  providers: [
    AccountService,
    MoneyService,
    BlogService,
    PwdService,
  ],
})
export class AppModule {}
