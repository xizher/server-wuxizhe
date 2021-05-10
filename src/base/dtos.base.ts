import { ApiProperty } from '@nestjs/swagger'

export class QueryListResultDTO<T> {
  @ApiProperty()
  readonly total: number
  @ApiProperty()
  readonly items: T[]
}

export class QueryListDTO {
  @ApiProperty({ required: false })
  readonly pageIndex?: number
  @ApiProperty({ required: false })
  readonly pageSize?: number
  @ApiProperty({ required: false })
  readonly orders?: string[]
  // orders?: {
  //   name: string
  //   type: 'asc' | 'desc'
  // }[]
}
