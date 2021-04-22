export interface IMoneyDto {
  id: number
  type: string
  value: number
  lonlat: string | null
  time: string | number
  comment: string
}

export interface IMoneyFormatDto extends IMoneyDto {
  timeFormat: string
}

export interface IAddMoneyDot {
  type: string
  value: number
  lonlat?: string
  comment?: string
}

export interface IDeleteMoneyDto {
  ids: string[] | string
}
