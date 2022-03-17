import {
    Controller,
    Param,
    Req,
    Put,
} from '@nestjs/common'
import { UserRequest } from 'src/util/middleware'
import { PlatformService } from './service'

@Controller('/platforms')
export class PlatformController {
    constructor(
        private readonly platformService:PlatformService,
    ) {}

    @Put('/:platformId/profiles/:username')
    async CreatePlatformProfile(@Req() { user }:UserRequest, @Param() { platformId, username }) {
        await this.platformService.createPlatformAccount({
            platformId,
            username,
            user,
            games: [],
        })
        return { success: true }
    }
}
