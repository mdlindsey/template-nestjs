import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'stats_splitgate_match_info', database: DB_NAME })
class SplitgateMatchInfo extends BaseEntity {
    @PrimaryColumn('citext', { name: 'match_id' })
    matchId: string

    @Column('citext', { name: 'playlist_type' })
    playlistType: 'ranked' | 'unranked'

    @Column('citext', { name: 'playlist_name' })
    playlistName: string

    @Column('citext', { name: 'mode_name' })
    modeName: string

    @Column('citext', { name: 'map_name' })
    mapName: string

    @Column('citext', { name: 'map_image_url', nullable: true })
    mapImageUrl?: string

    @Column('timestamp with time zone', { name: 'start_time' })
    startTime: Date

    @Column('timestamp with time zone', { name: 'end_time' })
    endTime: Date
}

@EntityRepository(SplitgateMatchInfo)
class SplitgateMatchInfoRepository extends BaseRepository<SplitgateMatchInfo> {
    
}

export {
    SplitgateMatchInfo as Entity,
    SplitgateMatchInfoRepository as Repository,
}
