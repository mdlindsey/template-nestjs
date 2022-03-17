import {
    Entity,
    EntityRepository,
    PrimaryColumn,
    Column,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'platforms', database: DB_NAME })
class PlatformProfile extends BaseEntity {
    @PrimaryColumn('citext')
    id: string

    @Column('citext')
    name: string
}

@EntityRepository(PlatformProfile)
class PlatformProfileRepository extends BaseRepository<PlatformProfile> {
    
}

export {
    PlatformProfile as Entity,
    PlatformProfileRepository as Repository,
}
