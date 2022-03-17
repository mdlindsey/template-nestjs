import { Exclude } from 'class-transformer'
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl, Length } from 'class-validator'
import * as User from './entities/user'

export class CreateUserDTO extends User.Entity {
    @IsString()
    @Length(4, 16)
    username: string

    @IsUrl()
    @IsOptional()
    avatarUrl: string

    @IsEmail()
    contactEmail: string

    @IsOptional()
    @IsPhoneNumber('US')
    contactPhone: string

    @Exclude()
    platformProfiles: []
}

export class CreateUserFromVendorDTO extends CreateUserDTO {
    // ??
}
