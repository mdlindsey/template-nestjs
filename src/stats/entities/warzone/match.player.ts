import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_cod_wz_match_player', database: DB_NAME })
class WarzoneMatchStats extends BaseEntity {
    @PrimaryColumn('citext', { name: 'match_id' })
    matchId: string

    @PrimaryColumn('citext')
    @Index()
    platform: string

    @PrimaryColumn('citext')
    @Index()
    username: string

    @Column('integer')
    score: number

    @Column('integer')
    kills: number

    @Column('integer')
    assists: number

    @Column('integer')
    deaths: number

    @Column('integer')
    headshots: number

    @Column('integer')
    executions: number

    @Column('integer', { name: 'time_played' })
    timePlayed: number

    @Column('integer', { name: 'damage_done' })
    damageDealt: number

    @Column('integer', { name: 'damage_taken' })
    damageTaken: number

    @Column('integer', { name: 'team_placement' })
    teamPlacement: number

    @Column('integer', { name: 'longest_streak' })
    longestStreak: number

    @Column('integer', { name: 'xp_misc' })
    xpMisc: number

    @Column('integer', { name: 'xp_medal' })
    xpMedal: number

    @Column('integer', { name: 'xp_match' })
    xpMatch: number

    @Column('integer', { name: 'xp_score' })
    xpScore: number

    @Column('integer', { name: 'xp_total' })
    xpTotal: number

    @Column('integer', { name: 'xp_bonus' })
    xpBonus: number

    @Column('integer', { name: 'xp_challenge' })
    xpChallenge: number

    @Column('integer', { name: 'gulag_kills' })
    gulagKills: number

    @Column('integer', { name: 'gulag_deaths' })
    gulagDeaths: number

    @Column('numeric', { name: 'team_survival_time' })
    teamSurvivalTime: number

    @Column('numeric', { name: 'distance_traveled' })
    distanceTraveled: number
    
    @Column('numeric', { name: 'percent_time_moving' })
    percentTimeMoving: number
}

@EntityRepository(WarzoneMatchStats)
class WarzoneMatchStatsRepository extends BaseRepository<WarzoneMatchStats> {
    
}

export {
    WarzoneMatchStats as Entity,
    WarzoneMatchStatsRepository as Repository,
}