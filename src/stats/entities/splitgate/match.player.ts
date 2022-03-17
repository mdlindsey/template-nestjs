import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_splitgate_match_player', database: DB_NAME })
class SplitgateMatchStats extends BaseEntity {
    @PrimaryColumn('citext', { name: 'match_id' })
    matchId: string

    @PrimaryColumn('citext')
    @Index()
    platform: string

    @PrimaryColumn('citext')
    @Index()
    username: string

    @Column('integer')
    points: number

    @Column('integer')
    kills: number

    @Column('integer')
    assists: number

    @Column('integer', { name: 'damage_dealt' })
    damageDealt: number

    @Column('integer')
    deaths: number

    @Column('integer')
    suicides: number

    @Column('integer')
    teabags: number

    @Column('integer', { name: 'teabags_denied' })
    teabagsDenied: number

    @Column('integer')
    collaterals: number

    @Column('integer', { name: 'melee_kills' })
    meleeKills: number

    @Column('integer', { name: 'portal_kills' })
    portalKills: number

    @Column('integer', { name: 'kills_thru_portal' })
    killsThruPortal: number

    @Column('integer', { name: 'time_played' })
    timePlayed: number

    @Column('integer', { name: 'revenge_kills' })
    revengeKills: number

    @Column('integer', { name: 'headshot_kills' })
    headshotKills: number

    @Column('integer', { name: 'shots_fired' })
    shotsFired: number

    @Column('integer', { name: 'shots_landed' })
    shotsLanded: number

    @Column('integer', { name: 'headshots_landed' })
    headshotsLanded: number

    @Column('integer', { name: 'medal_double_kills' })
    medalDoubleKills: number

    @Column('integer', { name: 'medal_triple_kills' })
    medalTripleKills: number

    @Column('integer', { name: 'medal_quad_kills' })
    medalQuadKills: number

    @Column('integer', { name: 'medal_quint_kills' })
    medalQuintKills: number

    @Column('integer', { name: 'medal_sex_kills' })
    medalSexKills: number

    @Column('integer', { name: 'medal_killstreak_1' })
    medalKillstreak1: number

    @Column('integer', { name: 'medal_killstreak_2' })
    medalKillstreak2: number

    @Column('integer', { name: 'medal_killstreak_3' })
    medalKillstreak3: number

    @Column('integer', { name: 'medal_killstreak_4' })
    medalKillstreak4: number

    @Column('integer', { name: 'medal_killstreak_5' })
    medalKillstreak5: number

    @Column('integer', { name: 'medal_killstreak_6' })
    medalKillstreak6: number

    @Column('integer', { name: 'rank_xp' })
    rankXp: number

    @Column('integer', { name: 'rank_level' })
    rankLevel: number

    @Column('integer', { name: 'progression_xp' })
    progressionXp: number

    @Column('integer', { name: 'progression_level' })
    progressionLevel: number

    @Column('integer', { name: 'portals_spawned' })
    portalsSpawned: number

    @Column('integer', { name: 'own_portals_entered' })
    ownPortalsEntered: number

    @Column('integer', { name: 'oddballs_picked_up' })
    oddballsPickedUp: number

    @Column('integer', { name: 'oddball_kills' })
    oddballKills: number

    @Column('integer', { name: 'oddball_carrier_kills' })
    oddballCarrierKills: number

    @Column('integer', { name: 'king_slayers' })
    kingSlayers: number

    @Column('integer', { name: 'kills_on_hill' })
    killsOnHill: number

    @Column('integer', { name: 'kills_as_vip' })
    killsAsVIP: number

    @Column('integer', { name: 'hills_neutralized' })
    hillsNeutralized: number

    @Column('integer', { name: 'hills_captured' })
    hillsCaptured: number

    @Column('integer', { name: 'highest_consecutive_kills' })
    highestConsecutiveKills: number

    @Column('integer', { name: 'flags_returned' })
    flagsReturned: number

    @Column('integer', { name: 'flags_picked_up' })
    flagsPickedUp: number

    @Column('integer', { name: 'flag_kills' })
    flagKills: number

    @Column('integer', { name: 'flag_carrier_kills' })
    flagCarrierKills: number

    @Column('integer', { name: 'first_bloods' })
    firstBloods: number

    @Column('integer', { name: 'enemy_portals_entered' })
    enemyPortalsEntered: number

    @Column('integer', { name: 'enemy_portals_destroyed' })
    enemyPortalsDestroyed: number

    @Column('integer', { name: 'enemy_kills_on_hill' })
    enemyKillsOnHill: number

    @Column('integer', { name: 'distance_portaled' })
    distancePortaled: number

    @Column('integer', { name: 'ally_portals_entered' })
    allyPortalsEntered: number

    @Column('numeric', { name: 'adaptive_difficulty_avg' })
    adaptiveDifficultyAverage: number
}

@EntityRepository(SplitgateMatchStats)
class SplitgateMatchStatsRepository extends BaseRepository<SplitgateMatchStats> {
    
}

export {
    SplitgateMatchStats as Entity,
    SplitgateMatchStatsRepository as Repository,
}