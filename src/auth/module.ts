import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/users/module'
import { AuthController } from './controller'
import { AuthService } from './service'
import * as EmailCodes from './entities/emails'
import * as LoginAttempt from './entities/login'
import * as ExternalCredentials from './entities/external'

@Module({
  exports: [],
  providers: [
    AuthService,
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      EmailCodes.Entity,
      LoginAttempt.Entity,
      ExternalCredentials.Entity,
    ]),
  ],
})
export class AuthModule {}
