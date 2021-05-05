/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'
import { QueryListDTO, QueryListResultDTO } from 'src/base/dtos.base'
import SerivceBase from 'src/base/service.base'
import { AddBlogDTO, BlogDTO } from './blog.dto'
import ext from '@xizher/js-ext'

@Injectable()
export class BlogService extends SerivceBase {

  //#region 构造函数

  constructor () {
    super('tb_blog')
  }

  //#endregion

  //#region 公有方法

  public async $list <T> (options: QueryListDTO) : Promise<QueryListResultDTO<T>> {
    console.log('jj')
    const { total, items } = await super.$list<BlogDTO>(options)
    return {
      total, items: items.map(item => ({
        ...item,
        id: item.id,
        title: unescape(item.title),
        description: unescape(item.description),
        keywords: unescape((item.keywords as string)).split(','),
        content: unescape(item.content),
        publish: item.publish,
        createtime: Number(item.createtime),
        moditytime: Number(item.moditytime),
        createTime: ext(Number(item.createtime)).toDateFormat('yyyy/MM/dd hh:mm:ss'),
        modityTime: ext(Number(item.moditytime)).toDateFormat('yyyy/MM/dd hh:mm:ss'),
      })) as any
    }
  }

  // public async $insert (dto: AddBlogDTO) : Promise<true> {
  //   const { title, description, keywords, content } = dto
  // }

  //#endregion

}

export default BlogService
