import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_cod_wz_agg_player', database: DB_NAME })
class WarzoneProfileStats extends BaseEntity {
    @PrimaryColumn('citext')
    platform: string

    @PrimaryColumn('citext')
    @Index()
    username: string

    @Column('citext', { nullable: true })
    @Index()
    modeId?: string

    @Column('integer')
    matches: number

    @Column('integer')
    wins: number

    @Column('integer')
    top5: number

    @Column('integer')
    top10: number

    @Column('integer')
    top25: number

    @Column('integer')
    score: number

    @Column('integer')
    kills: number

    @Column('integer')
    deaths: number

    @Column('integer', { name: 'time_played' })
    timePlayed: number
}

@EntityRepository(WarzoneProfileStats)
class WarzoneProfileStatsRepository extends BaseRepository<WarzoneProfileStats> {
    
}

export {
    WarzoneProfileStats as Entity,
    WarzoneProfileStatsRepository as Repository,
}