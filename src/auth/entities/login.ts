import {
    Column,
    Entity,
    EntityRepository,
    Index,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'
import { Device, Location, UserLoginErrorCode } from '../model'

@Entity({ name: 'auth_login_attempts', database: DB_NAME })
class LoginAttempt extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?:string

    @Column('citext', { name: 'user_id', nullable: true })
    @Index()
    userId?: string

    @Column('citext', { name: 'client_ip', nullable: true })
    @Index()
    ip?: string

    @Column('jsonb', { name: 'client_loc', nullable: true })
    @Index()
    location?: Location

    @Column('citext', { name: 'user_agent', nullable: true })
    @Index()
    userAgent?: string

    @Column('jsonb', { name: 'device', nullable: true })
    @Index()
    device?: Device

    @Column('citext', { name: 'oauth_vendor_id', nullable: true })
    vendorId?: string

    @Column('boolean')
    success: boolean

    @Column('citext', { name: 'error', nullable: true })
    errorCode?: UserLoginErrorCode

    @Column('jsonb', { nullable: true })
    metadata?: any
}

@EntityRepository(LoginAttempt)
class LoginAttemptRepository extends BaseRepository<LoginAttempt> {
    public async save(entity:Omit<LoginAttempt, 'id'>) {
        return this.repository.save(entity)
    }
}

export {
    LoginAttempt as Entity,
    LoginAttemptRepository as Repository,
}
