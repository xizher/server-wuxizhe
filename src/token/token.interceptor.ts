import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { ErrorModel, ErrorType } from 'src/model/res.model'
import { getAndCheckAccountByToken } from '.'

export class TokenInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const token = context.getArgByIndex(0).headers.token
    const account = await getAndCheckAccountByToken(token)
    if (!account) {
      return of(new ErrorModel(ErrorType.TOKEN_ERROR))
    }
    return next.handle().pipe()
  }
}
