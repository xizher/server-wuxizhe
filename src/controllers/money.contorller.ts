import { Controller, Get, Post, Req, Request } from '@nestjs/common'
import { ErrorModel, SuccessModel } from 'src/model/res.model'
import { MoneyService } from 'src/services/money.service'

@Controller('/api/money')
export class MoneyController {

  constructor (private readonly moneyService: MoneyService) {
    // nothing
  }

  @Get('/list')
  async listAll (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.moneyService.listMoney(req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/add')
  async add (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.moneyService.addMoney(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

  @Post('/delete')
  async delete (@Req() req: Request) : Promise<unknown> {
    try {
      return new SuccessModel(await this.moneyService.deleteMoney(req.body as any, req.headers['token'])) // eslint-disable-line
    } catch (error) {
      return new ErrorModel(error)
    }
  }

}
