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
}

@Post()
  async addMoods(
    @Body('creation_date') moodStoredDate: Date,
    @Body('text') moodText: string,
    @Body('emotion') moodEmotion: string,
    @Body('creator_name') moodCreatorName: string,
    @Body('creator_id') moodCreatorId: string,
  ) {
    const generatedId = await this.moodsService.insertMoods(
      moodStoredDate,
      moodText,
      moodEmotion,
      moodCreatorName,
      moodCreatorId,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllMoods() {
    return await this.goalsService.getGoals();
  }

  @Get(':id')
  getMood(@Param('id') moodId: string) {
    return this.moodsService.getSingleMood(moodId);
  }

  @Patch(':id/:removeStoredDate')
  async updateMood(
    @Param('id') moodId: string,
    @Param('removeStoredDate') removeStoredDate: string,
    @Body('stored_date') moodStoredDate: Date,
    @Body('creation_date') moodStoredDate: Date,
    @Body('text') moodText: string,
    @Body('emotion') moodEmotion: string,
    @Body('creator_name') moodCreatorName: string,
    @Body('creator_id') moodCreatorId: string,
  ) {
    await this.moodsService.updateMood(
      moodId,
      removeStoredDate === 'true',
      moodStoredDate,
      moodText,
      moodEmotion,
      moodCreatorName,
      moodCreatorId
    );
    return null;
  }

  @Delete(':id')
  async removeMood(@Param('id') moodId: string) {
    await this.moodsService.deleteMood(moodId);
    return null;
  }

/*   @Get('user/:userid/:completed')
  async getAllMoodsToUser(
    @Param('moodsId') moodsId: string,
  ){
    return await this.moodsService.getMoodsToUser(userid, completed);
  }   }*/
