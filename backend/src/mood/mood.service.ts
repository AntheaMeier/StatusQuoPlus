import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoodService {
  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}

  async getMoodsOfTeam(supervisor_id: string) {
    let moods;

    try {
      moods = this.moodModel.find({ supervisor_id: supervisor_id });
    } catch (error) {
      throw new NotFoundException('Could not find mood');
    }
    if (!moods) {
      throw new NotFoundException('Could not find mood');
    }
    return moods;
  }
}
