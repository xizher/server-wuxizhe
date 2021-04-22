export interface IMoneyDto {
  id: number
  type: string
  value: number
  lonlat: string | null
  time: string
  comment: string
}

export interface IMoneyFormatDto {
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
