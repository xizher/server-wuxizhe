export interface IAddBlogDto {
  title: string
  description: string
  keywords: string[]
  content: string
}

export interface IBlogDto {
  id: string
  title: string
  description: string
  keywords: string[] | string
  content: string
  createTime?: string
  createtime?: string
  modityTime?: string
  moditytime?: string
}

export interface IBlogListDto {
  total: number
  items: IBlogDto[]
}

export interface IModityBlogDto {
  id: string
  title?: string
  description?: string
  keywords?: string[]
  content?: string
}

export interface IDeleteBlogDto {
  id: string
}
