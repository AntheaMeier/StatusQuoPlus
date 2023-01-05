import { MoodService } from './mood.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('mood')
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Get('/team/:id')
  async getAllMoodsOfTeam(@Param('id') supervisor_id: string) {
    return await this.moodService.getMoodsOfTeam(supervisor_id);
  }
}
