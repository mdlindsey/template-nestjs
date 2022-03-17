import {
    Column,
    Entity,
    EntityRepository,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { DB_NAME } from 'src/config'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import * as PlatformAccount from 'src/platforms/entities/account'
import * as ExternalAccount from 'src/users/entities/external'

@Entity({ name: 'users', database: DB_NAME })
class UserAccount extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('citext', { name: 'email' })
    email: string

    @Column('citext', { name: 'phone', nullable: true })
    phone?: string

    @Column('citext')
    username: string

    @Column('citext', { name: 'avatar_url', nullable: true })
    avatarUrl?: string

    @OneToMany(() => ExternalAccount.Entity, acct => acct.user, { eager: true })
    @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
    externalAccounts?: ExternalAccount.Entity[]

    @OneToMany(() => PlatformAccount.Entity, profile => profile.user, { eager: true })
    platformAccounts?: PlatformAccount.Entity[]
}

@EntityRepository(UserAccount)
class UserAccountRepository extends BaseRepository<UserAccount> {
    public async save(entity:Omit<UserAccount, 'id'>) {
        return this.repository.save(entity)
    }
}

export {
    UserAccount as Entity,
    UserAccountRepository as Repository,
}
