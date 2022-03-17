import {
    Column,
    Entity,
    Index,
    EntityRepository,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'
import * as User from 'src/users/entities/user'
import { Exclude } from 'class-transformer'

@Entity({ name: 'users_external', database: DB_NAME })
class UserExternalAccount extends BaseEntity {
    @PrimaryColumn('citext', { name: 'vendor_id' })
    vendorId: string

    @PrimaryColumn('citext', { name: 'vendor_user_id' })
    @Index()
    vendorUserId: string

    @PrimaryColumn('uuid', { name: 'user_id' })
    @Index()
    userId: string

    @ManyToOne(() => User.Entity, user => user.externalAccounts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: User.Entity

    @Column('citext', { nullable: true, name: 'vendor_user_email' })
    vendorUserEmail?: string

    @Column('citext', { nullable: true, name: 'vendor_username' })
    vendorUsername?: string

    @Column('citext', { nullable: true, name: 'vendor_display_name' })
    vendorDisplayName?: string

    @Column('citext', { nullable: true, name: 'vendor_avatar_url' })
    vendorAvatarUrl?: string
}

@EntityRepository(UserExternalAccount)
class UserExternalAccountRepository extends BaseRepository<UserExternalAccount> {
    
}

export {
    UserExternalAccount as Entity,
    UserExternalAccountRepository as Repository,
}
