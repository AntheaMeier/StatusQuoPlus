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
      @Body('creator_id') creatorId: string,
      @Body('creator_name') creatorname: string,
      @Body('creation_date') date: Date,
      @Body('emotion') emotion: string,
      @Body('text') text: string,
    ) {
      console.log(creatorId + " " + creatorname + " " + date + " " + emotion + " " + text);
      const generatedId = await this.moodService.insertMood(
        creatorId,
        creatorname,
        emotion,
        date,
        text,
      );
      return { id: generatedId };
    }
}
