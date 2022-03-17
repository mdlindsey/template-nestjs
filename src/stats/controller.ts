import {
    Controller,
    Param,
    Get,
} from '@nestjs/common'
import { StatsService } from './service'

@Controller('/stats')
export class StatsController {
    constructor(
        private readonly statsService:StatsService,
    ) {}

    @Get('/:game/:platform/:username')
    async GetPlayerStats(@Param() { game, platform, username }) {
        
    }
}
