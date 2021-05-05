/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, Get, Headers, Post, Query, Req, Request, UseInterceptors } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { BaseInterceptor } from 'src/services/base.service'
import { BlogService } from 'src/services/blog.service'

@Controller('/api/blog')
@UseInterceptors(BaseInterceptor)
export class BlogController {

  constructor (private readonly blogService: BlogService) {
    // nothing
  }


  @Post('/add')
  async addBlog (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.blogService.addBlog(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }


  @Get('/list')
  async listBlogs (@Query() query, @Headers() headers) : Promise<unknown> {
    try {
      return new SuccessModel(await this.blogService.$queryList(query, headers['token']))
    } catch (error) {
      return new ErrorModel(error)
    }
  }


  @Post('/modity')
  async modityBlog (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.blogService.modityBlog(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }


  @Post('/delete')
  async deleteBlog (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.blogService.deleteBlog(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

}
