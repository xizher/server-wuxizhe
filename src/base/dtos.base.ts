export class QueryListResultDTO<T> {
  readonly total: number
  readonly items: T[]
}

export class QueryListDTO {
  readonly pageIndex?: number
  readonly pageSize?: number
  readonly orders?: string
  // orders?: {
  //   name: string
  //   type: 'asc' | 'desc'
  // }[]
}
