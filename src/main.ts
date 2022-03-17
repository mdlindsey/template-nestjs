// Hydrate environment variables before all else
require('dotenv').config()
import * as requestIp from 'request-ip'
import * as bodyParser from 'body-parser'
import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { RootModule } from './module'
import { ClassToPlainInterceptor } from './util/interceptor'

const LISTENER_PORT = process.env.PORT || 8080

async function bootstrap() {
  const app = await NestFactory.create(RootModule)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(requestIp.mw()) // attach req.clientIp
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
  // ValidationPipe checks req body against DTO using class-validator
  app.useGlobalPipes(new ValidationPipe())
  // to use interceptor on req-specific controllers:
  // @Get('/route')
  // @UseInterceptors(ClassToPlainInterceptor)
  app.useGlobalInterceptors(new ClassToPlainInterceptor(app.get(Reflector)))
  await app.listen(LISTENER_PORT)
  // App is ready to go, log success/startup messaging
  console.log(
      `${'\x1b[32m' /* green */}${'\x1b[1m' /* bright/bold */}`+
      `----------------------------------------------------------\n`+
      `| NestJS API \n`+
      `| http://localhost:${LISTENER_PORT}\n`+
      `----------------------------------------------------------${'\x1b[0m' /* reset */}`
  )
}
bootstrap()
