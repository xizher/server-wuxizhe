import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setGlobelConfig } from '@xizher/pg'
import { pgConfig } from './config/db.config'
setGlobelConfig(pgConfig)

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
