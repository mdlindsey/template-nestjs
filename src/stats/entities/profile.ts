import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_profiles', database: DB_NAME })
class StatsProfile extends BaseEntity {
    @PrimaryColumn('citext')
    game: string

    @PrimaryColumn('citext')
    @Index()
    platform: string

    @PrimaryColumn('citext')
    @Index()
    username: string

    @Column('integer', { name: 'error_count', default: 0 })
    errorCount?: number

    @Column('citext', { name: 'profile_hash', nullable: true })
    profileHash?: string
}

@EntityRepository(StatsProfile)
class StatsProfileRepository extends BaseRepository<StatsProfile> {
    public async load(entity:Partial<StatsProfile>) {
        return this.repository.findOne(entity)
    }
    public async loadN(game:string, count:number) {
        return this.repository.createQueryBuilder()
            .select('*').where({ game }).orderBy('updated_datetime', 'ASC').limit(count).execute()
    }
}

export {
    StatsProfile as Entity,
    StatsProfileRepository as Repository,
}