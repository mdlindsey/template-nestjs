import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameController } from './controller'
import * as Game from 'src/games/entities/game'
import * as GameAccount from 'src/games/entities/account'
import { GameService } from './service'

@Module({
  exports: [],
  providers: [GameService],
  controllers: [GameController],
  imports: [
    TypeOrmModule.forFeature([
      Game.Entity,
      GameAccount.Entity,
    ]),
  ],
})
export class GameModule {}
