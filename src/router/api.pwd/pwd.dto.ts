export class PwdDTO {
  readonly id: string
  readonly name: string
  readonly pwd: string
  readonly comment: string
}

export class PwdListDTO {
  readonly total: number
  readonly items: PwdDTO[]
}

export class AddPwdDTO {
  readonly name: string
  readonly pwd: string
  readonly comment: string
}

export class ModityPwdDTO {
  readonly id: string
  readonly name?: string
  readonly pwd?: string
  readonly comment?: string
}

export class DeletePwdDTO {
  readonly id: string
}
