import { Controller, Get, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { BlogService } from 'src/services/blog.services'

@Controller('/api/blog')
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
  async listBlogs () : Promise<unknown> {
    try {
      return new SuccessModel(await this.blogService.listBlogs())
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
