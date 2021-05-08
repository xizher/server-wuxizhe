export class AccountInfoDTO {
  readonly id: string
  readonly username: string
  readonly email: string
}

export class AccountLoginDTO {
  readonly account: string
  readonly password: string
}

export class AccountLoginErrorDTO {
  readonly success: false
}

export class AccountLoginSuccessDTO {
  readonly success: true
  readonly token: string
  readonly account: AccountInfoDTO
}

export type AccountLoginResultDTO = AccountLoginSuccessDTO | AccountLoginErrorDTO

export class TokenDTO {
  token: string
}
