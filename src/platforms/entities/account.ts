import {
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'
import * as User from 'src/users/entities/user'
import * as GameAccount from 'src/games/entities/account'

@Entity({ name: 'platform_accounts', database: DB_NAME })
class PlatformAccount extends BaseEntity {
    @PrimaryColumn('citext', { name: 'platform_id' })
    platformId: string

    @PrimaryColumn('citext')
    @Index()
    username: string

    @ManyToOne(() => User.Entity, user => user.platformAccounts)
    user: User.Entity

    @Exclude()
    @OneToMany(() => GameAccount.Entity, game => game.platformAccount, { eager: true })
    games: GameAccount.Entity[]
}

@EntityRepository(PlatformAccount)
class PlatformAccountRepository extends BaseRepository<PlatformAccount> {
    
}

export {
    PlatformAccount as Entity,
    PlatformAccountRepository as Repository,
}
