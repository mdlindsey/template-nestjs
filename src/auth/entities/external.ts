import {
    Column,
    Entity,
    EntityRepository,
    PrimaryColumn,
    Index,
} from 'typeorm'
import { BaseEntity, BaseRepository } from 'src/util/abstract'
import { DB_NAME } from 'src/config'

@Entity({ name: 'auth_external_credentials', database: DB_NAME })
class ExternalOAuthCredentials extends BaseEntity {
    @PrimaryColumn('citext', { name: 'vendor_id' })
    vendorId: string

    @PrimaryColumn('citext', { name: 'vendor_user_id' })
    @Index()
    vendorUserId: string

    @Column('citext', { name: 'vendor_access_token' })
    vendorAccessToken: string

    @Column('citext', { name: 'vendor_refresh_token' })
    vendorRefreshToken: string
}

@EntityRepository(ExternalOAuthCredentials)
class ExternalOAuthCredentialsRepository extends BaseRepository<ExternalOAuthCredentials> {
    
}

export {
    ExternalOAuthCredentials as Entity,
    ExternalOAuthCredentialsRepository as Repository,
}
