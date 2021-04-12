/* eslint-disable @typescript-eslint/no-namespace */

export namespace account {

  export namespace req {

    export interface IAccountUpdateDto {
      id: string
      username?: string
      password?: string
      email?: string
    }

    export interface IAccountDeleteDto {
      id: string
    }

    export interface IAccountInsertDto {
      username: string
      password: string
      email: string
    }

    export interface IAccountLoginDto {
      account: string
      password: string
    }

  }

  export namespace res {

    export interface IAccountInfoDto {
      id: string
      username: string
      password?: string
      email: string
      createTime: string
    }

    export interface IAccountInfoListDto {
      items: IAccountInfoDto[]
      total: number
    }

    export interface IAccountLoginResultDto {
      success: boolean
      token?: string
    }

  }

}
