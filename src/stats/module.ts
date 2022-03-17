import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatsController } from './controller'
import { StatsService } from './service'
import * as StatsProfile from './entities/profile'

@Module({
  exports: [],
  providers: [
    StatsService,
  ],
  controllers: [StatsController],
  imports: [
    TypeOrmModule.forFeature([
      StatsProfile.Entity,
    ]),
  ],
})
export class StatsModule {}
