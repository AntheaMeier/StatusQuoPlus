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
    @Body('id') moodId: string,
    @Body('creation_date') moodCreationDate: Date,
    @Body('creator_name') moodCreatorName: string,
    @Body('creator_id') moodCreatorId: string,
    @Body('text') moodText: string,
    @Body('emotion') moodEmotion: string,
  ) {
    console.log(moodId + " " + moodEmotion + " " + moodCreationDate);
    const generatedId = await this.moodService.insertMood(
      moodId,
      moodCreationDate,
      moodCreatorName,
      moodCreatorId,
      moodText,
      moodEmotion,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllMood() {
    return await this.moodService.getMoods();
  }

  @Get(':id')
  getFeedback(@Param('id') moodId: string) {
    return this.moodService.getSingleMood(moodId);
  }

  @Get('receiver/:receiver_id')
  async getAllMoodsForReceiver(
    @Param('receiver_id') receiver_id: string) {
    return await this.moodService.getMoodForReceiver(receiver_id);
  }
 

}
