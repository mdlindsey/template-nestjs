import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_cod_wz_match_info', database: DB_NAME })
class WarzoneMatchInfo extends BaseEntity {
    @PrimaryColumn('citext', { name: 'match_id' })
    matchId: string

    @Column('citext', { name: 'map_id' })
    mapId: string

    @Column('citext', { name: 'map_name' })
    mapName: string

    @Column('citext', { name: 'map_image_url', nullable: true })
    mapImageUrl?: string

    @Column('citext', { name: 'mode_id' })
    modeId: string

    @Column('citext', { name: 'mode_name' })
    modeName: string

    @Column('timestamp with time zone', { name: 'start_time' })
    startTime: Date

    @Column('timestamp with time zone', { name: 'end_time' })
    endTime: Date
}

@EntityRepository(WarzoneMatchInfo)
class WarzoneMatchInfoRepository extends BaseRepository<WarzoneMatchInfo> {
    
}

export {
    WarzoneMatchInfo as Entity,
    WarzoneMatchInfoRepository as Repository,
}
