import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlatformController } from './controller'
import { PlatformService } from './service'
import * as Platform from './entities/platform'
import * as PlatformAccount from './entities/account'

@Module({
  exports: [],
  providers: [PlatformService],
  controllers: [PlatformController],
  imports: [
    TypeOrmModule.forFeature([
      Platform.Entity,
      PlatformAccount.Entity,
    ]),
  ],
})
export class PlatformModule {}
