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
    ) {
      console.log(creatorId + " " + creatorName + " " + creationDate + " " + emotion + " " + text);
      const generatedId = await this.moodService.insertMood(
        creationDate,
        creatorId,
        creatorName,
        emotion,
        text,
      );
      return { id: generatedId };
    }
}
