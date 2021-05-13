import { ApiProperty } from '@nestjs/swagger'

export class TeacherDTO {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly name: string
  @ApiProperty()
  readonly ticket: number
}

export class TeacherListDTO {
  @ApiProperty()
  total: number
  @ApiProperty()
  items: TeacherDTO
}

export class AddTicketDTO {
  @ApiProperty()
  ids: string[]
}
