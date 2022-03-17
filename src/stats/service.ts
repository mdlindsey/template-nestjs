import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DB_NAME } from 'src/config'
import * as StatsProfile from './entities/profile'

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(StatsProfile.Entity, DB_NAME) public readonly statsProfiles: StatsProfile.Repository,
  ) {}
  
}
