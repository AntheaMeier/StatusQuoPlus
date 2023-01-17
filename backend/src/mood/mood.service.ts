import {Mood} from './mood.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';

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

  async getMoodForUser(creator_id: string) {
    let moods;

    try {
      moods = await this.moodModel.find( { creator_id: creator_id } )
    }
    catch(error) {
      throw new NotFoundException('Could not find mood');
    }
    if (!moods) {
      throw new NotFoundException('Could not find mood');
    }
    return moods;
  }

  async getSingleMood(moodId: string) {
    return await this.findMood(moodId);
  }

  private async findMood(id: string): Promise<Mood> {
    let mood;
    try {
      mood = await this.moodModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find goal.');
    }
    if (!mood) {
      throw new NotFoundException('Could not find goal.');
    }
    return mood;
  }

  async updateMood(
    moodId: string,
    creation_date: Date,
    creator_id: string,
    emotion: string,
    text: string,
    hidden: boolean,
  ) {
    const updatedMood = await this.findMood(moodId);
    if (text) {
      updatedMood.text = text;
    }
    if (emotion) {
      updatedMood.emotion = emotion;
    }
    await updatedMood.save();
  }

  async deleteMood(moodId: string) {
    const result = await this.moodModel.deleteOne({ _id: moodId }).exec();
  }
}
