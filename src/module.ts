import {
  Get,
  Module,
  Controller,
  RequestMethod,
  type NestModule,
  type MiddlewareConsumer,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameModule } from './games/module'
import {
  NextClientMiddleware,
  UserMiddleware, UserOnlyMiddleware,
} from './util/middleware'
import { ORM_CFG } from './config'
import { AuthModule } from './auth/module'
// import { StatsModule } from './stats/module'
import { PlatformModule } from './platforms/module'
import { UserModule } from './users/module'

@Controller('/')
export class RootController {
    @Get('/health')
    async HealthCheck():Promise<{ rss:number, heapTotal:number, heapUsed:number }> {
      return process.memoryUsage()
    }
}

@Module({
  controllers: [RootController],
  imports: [
    UserModule,
    GameModule,
    PlatformModule,
    AuthModule,
    // StatsModule,
    TypeOrmModule.forRoot(ORM_CFG),
  ],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware, NextClientMiddleware)
      .forRoutes('*')
    consumer
      .apply(UserMiddleware, UserOnlyMiddleware)
      .forRoutes(
        { path: '/platforms/:platformId/profiles/:username', method: RequestMethod.PUT },
        { path: '/auth/vendor/*', method: RequestMethod.PUT },
        { path: '/auth/vendor/*', method: RequestMethod.DELETE },
      )
  }
}
