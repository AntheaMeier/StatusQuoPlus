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
