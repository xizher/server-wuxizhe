import { Module } from '@nestjs/common'
import { AccountController } from './controllers/account.controller'
import { BlogController } from './controllers/blog.controller'
import { MoneyController } from './controllers/money.contorller'
import { AccountService } from './services/account.services'
import { BlogService } from './services/blog.services'
import { MoneyService } from './services/money.services'

@Module({
  imports: [],
  controllers: [
    AccountController,
    MoneyController,
    BlogController,
  ],
  providers: [
    AccountService,
    MoneyService,
    BlogService,
  ],
})
export class AppModule {}
