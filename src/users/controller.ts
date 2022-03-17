import {
    Controller,
    Post,
    Body,
    Get,
    Req,
} from '@nestjs/common'
import { signJwt } from 'src/util/jwt'
import { UserRequest } from 'src/util/middleware'
import { PublicViewUser } from './model'
import { UserService } from './service'
import { CreateUserDTO } from './dto'

@Controller('/users')
export class UserController {
    constructor(
        private readonly userService:UserService,
    ) {}

    @Get('/me')
    async GetCurrentUser(@Req() req:UserRequest) {
        const user = await this.userService.getUserAccount({ id: req.user.id })
        return {
            user: new PublicViewUser(user),
            jwt: signJwt(user)
        }
    }

    @Post('/')
    async CreateUser(@Body() userDTO:CreateUserDTO) {
        const user = await this.userService.createUser(userDTO)
        return {
            user,
            jwt: signJwt(user)
        }
    }
}
