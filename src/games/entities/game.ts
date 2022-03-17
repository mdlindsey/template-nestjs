import {
    Entity,
    EntityRepository,
    PrimaryColumn,
    Column,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'games', database: DB_NAME })
class Game extends BaseEntity {
    @PrimaryColumn('citext')
    id: string

    @Column('citext')
    name: string

    @Column('citext', { name: 'platform_ids', array: true })
    platformIds: string[]
}

@EntityRepository(Game)
class GameRepository extends BaseRepository<Game> {
    
}

export {
    Game as Entity,
    GameRepository as Repository,
}
