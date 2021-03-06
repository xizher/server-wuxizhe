import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setGlobelConfig } from '@xizher/pg'
import { pgConfig } from './config/db.config'
import { NestExpressApplication } from '@nestjs/platform-express'
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { BlogDTO } from './router/api.blog/blog.dto'
setGlobelConfig(pgConfig)

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const options = new DocumentBuilder()
    .setTitle('nest入门接口标题')
    .setDescription('使用nest书写的常用性接口') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    // .setBasePath('http://localhost:5000')
    .build()
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options)
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api', app, document)
  await app.listen(3000)
}
bootstrap()
