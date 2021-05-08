import { Module } from '@nestjs/common'
import AccountController from './router/api.account/account.controller'
import AccountService from './router/api.account/account.service'
import BlogController from './router/api.blog/blog.controller'
import BlogService from './router/api.blog/blog.service'

@Module({
  imports: [],
  controllers: [
    AccountController,
    BlogController,
  ],
  providers: [
    AccountService,
    BlogService,
  ],
})
export class AppModule {}
