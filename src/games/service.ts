import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as GameAccount from './entities/account'

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameAccount.Entity) public readonly gameAccounts: GameAccount.Repository,
  ) {}

  async createGameAccount(gameAccount:Omit<GameAccount.Entity, 'id'>) {
    return this.gameAccounts.save(gameAccount)
  }
}
