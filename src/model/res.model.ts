/* eslint-disable @typescript-eslint/no-explicit-any */

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
export interface IError {
  msg: string
  detial: string
  description?: any
  description2?: any
}

export enum ErrorType {
  DATABASE_ERROR = '0x500<->数据库请求失败<->网络异常',
  INPUT_ERROR = '0x100<->输入参数格式不正确<->输入参数格式不正确',
  TOKEN_ERROR = '0x101<->Token已失效，请重新登录<->用户已过期，请重新登录'
}

export function createError (errorType: ErrorType) : Promise<never>
export function createError (code: string, detial: string, msg?: string) : Promise<never>
export function createError (...args: any[]) : Promise<never> {
  if (args.length === 1) {
    return Promise.reject(args[0])
  }
  const [code, detial, msg] = args
  return Promise.reject(`${code}<->${detial}<->${msg ? msg : detial}` as ErrorType)
}

export class BaseModel<T> {
  public code = '0x200'
  public data: T | null = null
  public error: IError | null = null
}

export class SuccessModel<T> extends BaseModel<T> {
  constructor (data: T) {
    super()
    this.data = data
  }
}

export class ErrorModel<T> extends BaseModel<T> {
  constructor (errorType: ErrorType | any, errorDescription?: any) { // eslint-disable-line
    super()
    const arrStr = errorType.split?.('<->') ?? {}
    if (arrStr.length !== 3) {
      this.code = '0x000'
      this.error = {
        msg: '系统异常',
        detial: '未知错误',
        description: '' + errorType,
        description2: errorType
      }
    } else {
      const [code, detial, msg] = arrStr
      this.code = code
      this.error = { detial, msg, description: errorDescription }
    }
  }
}

export class CatchErrorInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    return next.handle().pipe(
      catchError(async err => new ErrorModel(err))
    )
  }
}

export class SuccessResInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    return next.handle().pipe(
      map(data => new SuccessModel(data))
    )
  }
}
