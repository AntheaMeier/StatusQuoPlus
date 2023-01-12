import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoodService {

  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}

  async insertMood(
    creation_date: Date,
    creator_id: string,
    creator_name: string,
    emotion: string,
    text:string,
    hidden:boolean,
  ) {
    const newMood = new this.moodModel({
      creation_date: creation_date,
      creator_id: creator_id,
      creator_Name: creator_name,
      emotion: emotion,
      text: text,
      hidden: hidden,
    });
    const result = await newMood.save();
    return result.id;
  }
}
