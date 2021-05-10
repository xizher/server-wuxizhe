import { Controller, Get, Post, Query, UseInterceptors, Body } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger'
import { QueryListDTO, } from 'src/base/dtos.base'
import { CatchErrorInterceptor, SuccessResInterceptor } from 'src/model/res.model'
import { TokenInterceptor } from 'src/token/token.interceptor'
import { AddBlogDTO, BlogDTO, BlogListDTO, ModityBlogDTO } from './blog.dto'
import BlogService from './blog.service'

@Controller('/api/blog')
@UseInterceptors(TokenInterceptor, CatchErrorInterceptor, SuccessResInterceptor)
export class BlogController {

  constructor (private readonly blogService: BlogService) {
    //
  }

  @ApiTags('文档管理')
  @ApiHeader({
    name: 'token'
  })
  @ApiQuery({
    type: QueryListDTO
  })
  @ApiCreatedResponse({
    type: BlogListDTO
  })
  @Get('/list')
  async list (@Query() query: QueryListDTO) : Promise<unknown> {
    return await this.blogService.$list<BlogDTO>(query)
  }

  @ApiTags('文档管理')
  @ApiHeader({
    name: 'token'
  })
  @ApiBody({
    type: AddBlogDTO
  })
  @Post('/add')
  async add (@Body() body: AddBlogDTO) : Promise<unknown> {
    return await this.blogService.$insert(body)
  }

  @ApiTags('文档管理')
  @ApiHeader({
    name: 'token'
  })
  @ApiBody({
    type: ModityBlogDTO
  })
  @Post('/modity')
  async modity (@Body() body: ModityBlogDTO) : Promise<unknown> {
    return await this.blogService.$modity(body)
  }

}

export default BlogController
