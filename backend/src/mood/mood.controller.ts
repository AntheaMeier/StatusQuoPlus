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

  @Post()
  async addMood(
    @Body('creation_date') creationDate: Date,
    @Body('creator_id') creatorId: string,
    @Body('creator_name') creatorName: string,
    @Body('emotion') emotion: string,
    @Body('text') text: string,
    @Body('hidden') hidden: boolean,
  ) {
    console.log(creatorId + " " + creatorName + " " + creationDate + " " + emotion + " " + text + " " + hidden);
    const generatedId = await this.moodService.insertMood(
      creationDate,
      creatorId,
      creatorName,
      emotion,
      text,
      hidden,
    );
    return { id: generatedId };
  }

  @Get('user/:creator_id')
  async getAllMoodsForReceiver(
    @Param('creator_id') creator_id: string) {
    return await this.moodService.getMoodForUser(creator_id);
  }

  @Get(':id')
  getSingleMood(@Param('id') moodId: string) {
    return this.moodService.getSingleMood(moodId);
  }

  @Patch(':id')
  async updateMood(
    @Param('id') moodId: string,
    @Body('text') text: string,
    @Body('creation_date') creation_date: Date,
    @Body('creator_id') creator_id: string,
    @Body('emotion') emotion: string,
    @Body('hidden') hidden: boolean,
  ) {
    await this.moodService.updateMood(
      moodId,
      creation_date,
      creator_id,
      emotion,
      text,
      hidden,
    );
    return null;
  }

  @Delete(':id')
  async deleteMood(@Param('id') moodId: string) {
    await this.moodService.deleteMood(moodId);
    return null;
  }
}
