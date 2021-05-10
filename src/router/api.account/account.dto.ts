import { ApiProperty } from '@nestjs/swagger'

export class AccountInfoDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly username: string
  @ApiProperty()
  readonly email: string
}

export class AccountLoginDTO {
  @ApiProperty()
  readonly account: string
  @ApiProperty()
  readonly password: string
}

export class AccountLoginErrorDTO {
  @ApiProperty()
  readonly success: false
}

export class AccountLoginSuccessDTO {
  @ApiProperty()
  readonly success: true
  @ApiProperty()
  readonly token: string
  @ApiProperty()
  readonly account: AccountInfoDTO
}

export type AccountLoginResultDTO = AccountLoginSuccessDTO | AccountLoginErrorDTO

export class TokenDTO {
  @ApiProperty()
  token: string
}
