import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoodService {
  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}
}
