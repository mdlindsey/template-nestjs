import { Exclude, Expose } from 'class-transformer'
import * as PlatformAccount from 'src/platforms/entities/account'
import * as User from './entities/user'

export class FlattenedUser extends User.Entity {
    constructor(partial: Partial<User.Entity>) {
        super()
        Object.assign(this, partial)
    }

    @Expose()
    get games() {
        const gameProfiles = {}
        for(const { platformId, username, games } of this.platformAccounts) {
            if (!games) {
                continue
            }
            for(const { gameId } of games) {
                gameProfiles[gameId] = { username, platformId  }
            }
        }
        return gameProfiles
    }

    @Expose()
    get platforms() {
        const platformProfiles = {}
        for(const { platformId, username } of this.platformAccounts) {
            platformProfiles[platformId] = username
        }
        return platformProfiles
    }
}

export class PublicViewUser extends FlattenedUser {
    constructor(partial: Partial<User.Entity>) {
        super(partial)
        Object.assign(this, partial)
    }

    @Exclude()
    id: string

    @Exclude()
    contactEmail: string

    @Exclude()
    contactPhone: string
    
    @Exclude()
    platformProfiles: PlatformAccount.Entity[]
}
