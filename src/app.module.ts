import { Module } from '@nestjs/common'
import AccountController from './router/api.account/account.controller'
import AccountService from './router/api.account/account.service'
import BlogController from './router/api.blog/blog.controller'
import BlogService from './router/api.blog/blog.service'
import PwdController from './router/api.pwd/pwd.controller'
import PwdService from './router/api.pwd/pwd.service'

@Module({
  imports: [],
  controllers: [
    AccountController,
    BlogController,
    PwdController,
  ],
  providers: [
    AccountService,
    BlogService,
    PwdService,
  ],
})
export class AppModule {}
