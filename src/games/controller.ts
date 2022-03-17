import {
    Controller,
    Param,
    Req,
    Put,
} from '@nestjs/common'
import { UserRequest } from 'src/util/middleware'
import { GameService } from './service'

@Controller('/games')
export class GameController {
    constructor(
        private readonly gameService:GameService,
    ) {}

    @Put('/:gameId/profiles/:platformId/:username')
    async CreateGameProfile(@Req() { user }:UserRequest, @Param() { gameId, platformId, username }) {
        const platformAccount = user.platformAccounts.find(p => p.platformId === platformId && p.username === username)
        await this.gameService.createGameAccount({
            gameId,
            platformAccount,
        })
        return { success: true }
    }
}
