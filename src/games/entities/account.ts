import {
    Entity,
    EntityRepository,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import * as PlatformAccount from 'src/platforms/entities/account'
import { DB_NAME } from 'src/config'

@Entity({ name: 'game_accounts', database: DB_NAME })
class GameProfile extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('citext', { name: 'game_id' })
    gameId: string

    @ManyToOne(() => PlatformAccount.Entity, profile => profile.games)
    platformAccount: any
}

@EntityRepository(GameProfile)
class GameProfileRepository extends BaseRepository<GameProfile> {
    public async save(entity:Omit<GameProfile, 'id'>) {
        return this.repository.save(entity)
    }
}

export {
    GameProfile as Entity,
    GameProfileRepository as Repository,
}
