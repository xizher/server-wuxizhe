export class BlogDTO {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly keywords: string[] | string
  readonly content: string
  readonly publish: boolean
  readonly createtime: string | number
  readonly moditytime: string | number
  readonly createTime?: string
  readonly modityTime?: string
}

export class BlogListDTO {
  readonly total: number
  readonly items: BlogDTO[]
}

export class AddBlogDTO {
  readonly title: string
  readonly description: string
  readonly keywords: string[]
  readonly content: string
}

export class ModityBlogDTO {
  readonly id: string
  readonly title?: string
  readonly description?: string
  readonly keywords?: string[]
  readonly content?: string
  readonly publish?: boolean
}
