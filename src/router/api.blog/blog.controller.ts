import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { QueryListDTO } from 'src/base/dtos.base'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { TokenInterceptor } from 'src/token/token.interceptor'
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

}

export default BlogController
