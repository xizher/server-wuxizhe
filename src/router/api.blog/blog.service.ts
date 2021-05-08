/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'
import { QueryListDTO, QueryListResultDTO } from 'src/base/dtos.base'
import ServiceBase from 'src/base/service.base'
import { AddBlogDTO, BlogDTO, ModityBlogDTO } from './blog.dto'
import ext from '@xizher/js-ext'

@Injectable()
export class BlogService extends ServiceBase {

  //#region 构造函数

  constructor () {
    super('tb_blog')
  }

  //#endregion

  //#region 公有方法

  public async $list <T> (options: QueryListDTO) : Promise<QueryListResultDTO<T>> {
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

  public async $insert (dto: AddBlogDTO) : Promise<true> {
    const title = escape(dto.title)
    const description = escape(dto.description)
    const keywords = escape(dto.keywords.join(','))
    const content = escape(dto.content)
    const createtime = Date.now()
    const moditytime = createtime
    return await super.$insert({
      title, description, keywords, content,
      createtime, moditytime,
    })
  }

  public async $modity (dto: ModityBlogDTO) : Promise<true> {
    const { id, title, description, keywords, content, publish } = dto
    const updateObj : any = {}
    title && (updateObj.title = escape(title))
    description && (updateObj.description = escape(description))
    keywords && Array.isArray(keywords) && (updateObj.keywords = escape(keywords.join(',')))
    content && (updateObj.content = escape(content))
    updateObj.moditytime = Date.now()
    if (typeof publish === 'boolean') {
      updateObj.publish = publish
    }
    return await super.$modity({ id, ...updateObj })
  }

  //#endregion

}

export default BlogService
