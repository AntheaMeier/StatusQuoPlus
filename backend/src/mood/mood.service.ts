import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoodService {
  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}

   async insertMood(
      creator_id: string,
      creator_Name: string,
      text:string,
      creation_date: Date,
      emotion: string,

    ) {
      const newMood = new this.moodModel({
        creator_id: creator_id,
        creator_Name: creator_Name,
        text: text,
        creation_date: creation_date,
        emotion: emotion,
        });
      const result = await newMood.save();
      return result.id;
    }
}
