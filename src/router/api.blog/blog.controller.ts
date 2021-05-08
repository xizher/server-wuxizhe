import { Controller, Get, Post, Query, UseInterceptors, Body } from '@nestjs/common'
import { QueryListDTO } from 'src/base/dtos.base'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { TokenInterceptor } from 'src/token/token.interceptor'
import { AddBlogDTO, ModityBlogDTO } from './blog.dto'
import BlogService from './blog.service'

@Controller('/api/blog')
@UseInterceptors(TokenInterceptor, CatchErrorInterceptor, SuccessResInterceptor)
export class BlogController {

  constructor (private readonly blogService: BlogService) {
    //
  }

  @Get('/list')
  async list (@Query() query: QueryListDTO) : Promise<unknown> {
    return await this.blogService.$list(query)
  }

  @Post('/add')
  async add (@Body() body: AddBlogDTO) : Promise<unknown> {
    return await this.blogService.$insert(body)
  }
  @Post('/modity')
  async modity (@Body() body: ModityBlogDTO) : Promise<unknown> {
    return await this.blogService.$modity(body)
  }

}

export default BlogController
