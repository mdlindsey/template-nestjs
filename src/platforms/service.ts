import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as PlatformAccount from './entities/account'

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatformAccount.Entity) public readonly platformAccounts: PlatformAccount.Repository,
  ) {}

  async createPlatformAccount(account:Omit<PlatformAccount.Entity, 'id'>) {
    return this.platformAccounts.save(account)
  }
}
