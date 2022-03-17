import {
    Column,
    Entity,
    Index,
    EntityRepository,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'auth_email_codes', database: DB_NAME })
class EmailConfirmationCodes extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column('citext', { name: 'email' })
    @Index()
    email: string

    @Column('citext', { name: 'code' })
    code: string

    @Column('integer', { name: 'attempts', default: 0 })
    attempts?: number
}

@EntityRepository(EmailConfirmationCodes)
class EmailConfirmationCodesRepository extends BaseRepository<EmailConfirmationCodes> {
    
}

export {
    EmailConfirmationCodes as Entity,
    EmailConfirmationCodesRepository as Repository,
}
