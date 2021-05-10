import { ApiExtraModels, ApiProperty } from '@nestjs/swagger'

export class BlogDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly title: string
  @ApiProperty()
  readonly description: string
  @ApiProperty()
  readonly keywords: string[] | string
  @ApiProperty()
  readonly content: string
  @ApiProperty()
  readonly publish: boolean
  @ApiProperty({ type: Number })
  readonly createtime: string | number
  @ApiProperty({ type: Number })
  readonly moditytime: string | number
  @ApiProperty()
  readonly createTime?: string
  @ApiProperty()
  readonly modityTime?: string
}

export class BlogListDTO {
  @ApiProperty()
  readonly total: number
  @ApiProperty({
    type: [BlogDTO]
  })
  readonly items: BlogDTO[]
}

export class AddBlogDTO {
  @ApiProperty()
  readonly title: string
  @ApiProperty()
  readonly description: string
  @ApiProperty()
  readonly keywords: string[]
  @ApiProperty()
  readonly content: string
}

export class ModityBlogDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty({ required: false })
  readonly title?: string
  @ApiProperty({ required: false })
  readonly description?: string
  @ApiProperty({ required: false })
  readonly keywords?: string[]
  @ApiProperty({ required: false })
  readonly content?: string
  @ApiProperty({ required: false })
  readonly publish?: boolean
}
