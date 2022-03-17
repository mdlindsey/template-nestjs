import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserOnlyMiddleware } from 'src/util/middleware'
import { UserController } from './controller'
import { UserService } from './service'
import { UserDAO } from './dao'
import * as User from './entities/user'
import * as ExternalUserAccount from './entities/external'

@Module({
  exports: [
    UserService,
  ],
  providers: [
    UserDAO,
    UserService,
  ],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([
      User.Entity,
      ExternalUserAccount.Entity,
    ]),
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserOnlyMiddleware)
      .forRoutes(
        { path: '/users/me', method: RequestMethod.GET },
      )
  }
}
