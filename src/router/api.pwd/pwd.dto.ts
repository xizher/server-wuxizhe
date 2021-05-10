import { ApiProperty } from '@nestjs/swagger'

export class PwdDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly name: string
  @ApiProperty()
  readonly pwd: string
  @ApiProperty()
  readonly comment: string
}

export class PwdListDTO {
  @ApiProperty()
  readonly total: number
  @ApiProperty({ type: [PwdDTO] })
  readonly items: PwdDTO[]
}

export class AddPwdDTO {
  @ApiProperty()
  readonly name: string
  @ApiProperty()
  readonly pwd: string
  @ApiProperty()
  readonly comment: string
}

export class ModityPwdDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly name?: string
  @ApiProperty()
  readonly pwd?: string
  @ApiProperty()
  readonly comment?: string
}

export class DeletePwdDTO {
  readonly id: string
}
