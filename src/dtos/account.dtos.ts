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

    export interface IAccountInstallDto {
      username: string
      password: string
      email: string
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

  }

}
