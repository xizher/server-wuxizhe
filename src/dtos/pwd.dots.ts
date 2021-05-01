export interface IAddPwdDto {
  name: string
  pwd: string
  comment?: string
}

export interface IPwdDto {
  id: string
  name: string
  pwd: string
  comment: string
}

export interface IPwdListDto {
  total: number
  items: IPwdDto[]
}

export interface IModityPwdDto {
  id: string
  name?: string
  pwd?: string
  comment?: string
}
