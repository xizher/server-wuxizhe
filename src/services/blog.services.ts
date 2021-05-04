import { Injectable } from '@nestjs/common'
import { baseUtils } from '@xizher/js-utils'
import pgSqlExec from '@xizher/pg'
import { IAddBlogDto, IBlogDto, IBlogListDto, IDeleteBlogDto, IModityBlogDto } from 'src/dtos/blog.dots'
import { getAccountByToken } from 'src/token'
import ext from '@xizher/js-ext'

@Injectable()
export class BlogService {

  //#region 私有属性

  private _tableName = 'tb_blog'

  //#endregion

  //#region 私有方法

  //#endregion

  //#region 公有方法

  public async addBlog (dto: IAddBlogDto, token: string) : Promise<IBlogDto> {
    await getAccountByToken(token)
    const { title, description, keywords, content } = dto
    const id = baseUtils.createGuid()
    const createTime = Date.now()
    const sqlStr = `
      insert into ${this._tableName} (
        id, title, description, keywords, content, createtime, modityTime
      ) values (
        '${id}',
        '${escape(title)}',
        '${escape(description)}',
        '${escape(keywords.join(','))}',
        '${escape(content)}',
        '${createTime}',
        '${createTime}'
      )
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return {
      ...dto, id,
      publish: false,
      createTime: ext(createTime).toDateFormat('yyyy/MM/dd hh:mm:ss'),
      modityTime: ext(createTime).toDateFormat('yyyy/MM/dd hh:mm:ss'),
    }
  }

  public async listBlogs () : Promise<IBlogListDto> {
    const sqlStr = `
      select * from ${this._tableName}
    `
    const result = await pgSqlExec<IBlogDto>(sqlStr)
    return {
      total: result.rowCount,
      items: result.rows.map(item => ({
        ...item,
        id: item.id,
        title: unescape(item.title),
        description: unescape(item.description),
        keywords: unescape((item.keywords as string)).split(','),
        content: unescape(item.content),
        publish: item.publish,
        createTime: ext(Number(item.createtime)).toDateFormat('yyyy/MM/dd hh:mm:ss'),
        modityTime: ext(Number(item.moditytime)).toDateFormat('yyyy/MM/dd hh:mm:ss'),
      })).sort((i, j) => Number(i.createtime) - Number(j.createtime))
    }
  }

  public async modityBlog (dto: IModityBlogDto, token: string) : Promise<true> {
    await getAccountByToken(token)
    const { id, title, description, keywords, content, publish } = dto
    const time = Date.now()
    const updateList = []
    title && updateList.push(`title = '${escape(title)}'`)
    description && updateList.push(`description = '${escape(description)}'`)
    content && updateList.push(`content = '${escape(content)}'`)
    keywords && Array.isArray(keywords) && updateList.push(`keywords = '${escape(keywords.join(','))}'`)
    if (typeof publish === 'boolean') {
      updateList.push(`publish = ${publish}`)
    }
    const sqlStr = `
      update ${this._tableName} set ${updateList.join(',')}, moditytime= '${time}'
        where id = '${id}'
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  public async deleteBlog (dto: IDeleteBlogDto, token: string) : Promise<true> {
    await getAccountByToken(token)
    const sqlStr = `
      delete from ${this._tableName}
        where id = '${dto.id}'
    `
    const result = await pgSqlExec(sqlStr)
    if (result.rowCount !== 1) {
      return Promise.reject(result)
    }
    return true
  }

  //#endregion

}
