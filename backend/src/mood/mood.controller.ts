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
  async addMoods(
    @Body('creation_date') moodCreationDate: Date,
    @Body('text') moodText: string,
    @Body('emotion') moodEmotion: string,
    @Body('creator_name') moodCreatorName: string,
    @Body('creator_id') moodCreatorId: string,
  ) {
    const generatedId = await this.moodService.insertMood(
      moodCreationDate,
      moodText,
      moodEmotion,
      moodCreatorName,
      moodCreatorId,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllMoods() {
    return await this.moodService.getMood();
  }

  @Get(':id')
  getMood(@Param('id') moodId: string) {
    return this.moodService.getSingleMood(moodId);
  }

  @Patch(':id')
  async updateMood(
    @Param('id') moodId: string,
    @Body('creation_date') moodCreationDate: Date,
    @Body('text') moodText: string,
    @Body('emotion') moodEmotion: string,
    @Body('creator_name') moodCreatorName: string,
    @Body('creator_id') moodCreatorId: string,
  ) {
    await this.moodService.updateMood(
      moodId,
      moodCreationDate,
      moodText,
      moodEmotion,
      moodCreatorName,
      moodCreatorId,
    );
    return null;
  }

  @Delete(':id')
  async removeMood(@Param('id') moodId: string) {
    await this.moodService.deleteMood(moodId);
    return null;
  }
}

/* function updateMood() {
  throw new Error('Function not implemented.');
} */

/*   @Get('user/:userid/:completed')
  async getAllMoodsToUser(
    @Param('moodsId') moodsId: string,
  ){
    return await this.moodService.getMoodsToUser(userid, completed);
  }   }*/
