/* eslint-disable @typescript-eslint/no-namespace */

export interface IAddAccountDto {
  username: string
  email: string
  password: string
}

export interface IAccountInfoDto {
  id: string
  username: string
  email: string
}

// export interface IAccountUpdateDto {
//   id: string
//   username?: string
//   password?: string
//   email?: string
// }

// export interface IAccountUpdateResultDto {
//   id: string
//   username: string
//   email: string
// }

// export interface IAccountIdDto {
//   id: string
// }

// export interface IAccountInsertDto {
//   username: string
//   password: string
//   email: string
// }

// export interface IAccountLoginDto {
//   account: string
//   password: string
// }

// export interface IAccountLoginResultDto {
//   success: boolean
//   token?: string
//   account?: IAccountInfoDto
// }

// export interface IAccountCheckDto {
//   id: string
//   token: string
// }
// export interface IAccountCheckResultDto {
//   success: boolean
//   account?: IAccountInfoDto
// }
