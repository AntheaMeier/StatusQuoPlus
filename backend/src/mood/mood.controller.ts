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

  @Get('/team/:supervisor_id/team-member/:memberId/:startDate/:endDate')
  async getMoodsOfTeamMember(
    @Param('supervisor_id') supervisor_id: string,
    @Param('memberId') memberId: string,
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return await this.moodService.getMoodsOfTeamMember(
      supervisor_id,
      memberId,
      startDate,
      endDate,
    );
  }
}
