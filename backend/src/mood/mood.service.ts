import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoodService {
  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}

  async insertMood(
    id: string,
    creation_date: Date,
    creator_name: string,
    creator_id: string,
    mood_text: string,
    emotion: string,
  ) {
    const newMood = new this.moodModel({
      id: id,
      creation_date: creation_date,
      creator_name: creator_name,
      creator_id: creator_id,
      mood_text: mood_text,
      emotion: emotion,
      });
    const result = await newMood.save();
    return result.id;
  }

  async getMoods() {
    const moods = await this.moodModel.find().exec();
    return moods.map((mood) => ({
      id: mood.id,
      creation_date: mood.creation_date,
      creator_name: mood.creator_name,
      creator_id: mood.creator_id,
      mood_text: mood.mood_text,
      emotion: mood.emotion,
    }));
  }

  async getMoodForReceiver(receiver_id:string){
    let moods;

    try{
      moods = await this.moodModel.find( { receiver_id: receiver_id } )
    }
    catch(error){
      throw new NotFoundException('Could not find mood');
    }
    if (!moods) {
      throw new NotFoundException('Could not find mood');
    }
    return moods;
  }

  async getSingleMood(moodId: string) {
    const mood = await this.findMood(moodId);
    return {
      id: mood.id,
      creation_date: mood.creation_date,
      creator_name: mood.creator_name,
      creator_id: mood.creator_id,
      mood_text: mood.mood_text,
      emotion: mood.emotion,
    };
  }

  private async findMood(id: string): Promise<Mood> {
    let mood;
    try {
      mood = await this.moodModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find mood.');
    }
    if (!mood) {
      throw new NotFoundException('Could not find mood.');
    }
    return mood;
  }

}

