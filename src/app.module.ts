import { Module } from '@nestjs/common'
import { AccountController } from './controllers/account.controller'
import { AccountService } from './services/account.services'

@Module({
  imports: [],
  controllers: [
    AccountController,
  ],
  providers: [
    AccountService,
  ],
})
export class AppModule {}
