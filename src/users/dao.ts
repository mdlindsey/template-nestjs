import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as User from './entities/user'
import * as ExternalUserAccount from './entities/external'

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(User.Entity) public readonly users: User.Repository,
    @InjectRepository(ExternalUserAccount.Entity) public readonly externalAccounts: ExternalUserAccount.Repository,
  ) {}

  async getUserAccount(identifier:Partial<User.Entity>):Promise<User.Entity> {
    return this.users.findOne(identifier)
  }

  async getUserAccountByExternal(identifier:Partial<ExternalUserAccount.Entity>):Promise<User.Entity> {
    const external = await this.externalAccounts.findOne(identifier)
    if (!external) {
      return null
    }
    return this.users.findOne({ id: external.userId })
  }

  async createUserAccount(profile:Omit<User.Entity, 'id'>) {
    return this.users.save(profile)
  }

  async createExternalAccount(externalAccount:ExternalUserAccount.Entity) {
    return this.externalAccounts.save(externalAccount)
  }

  async removeExternalAccount(externalAccount:Partial<ExternalUserAccount.Entity>) {
    return this.externalAccounts.softDelete(externalAccount)
  }
  
}
