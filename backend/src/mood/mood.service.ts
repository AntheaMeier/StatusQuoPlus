import { Mood } from './mood.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MoodService {
  constructor(@InjectModel('Mood') private readonly moodModel: Model<Mood>) {}

  async insertMood(
    creation_date: Date,
    creator_name: string,
    creator_id: string,
    text: string,
    emotion: string,
  ) {
    const newMood = new this.moodModel({
      creation_date: creation_date,
      creator_name: creator_name,
      creator_id: creator_id,
      text: text,
      emotion: emotion,
    });

    const result = await newMood.save();
    return result.id;
  }

  async getMood() {
    const mood = await this.moodModel.find().exec();
    return mood.map((mood) => ({
      id: mood.id,
      creation_date: mood.creation_date,
      creator_name: mood.creator_name,
      creator_id: mood.creator_id,
      text: mood.text,
      emotion: mood.emotion,
    }));
  }

  async getSingleMood(moodId: string) {
    const mood = await this.findMood(moodId);
    return {
      id: mood.id,
      creation_date: mood.creation_date,
      creator_name: mood.creator_name,
      creator_id: mood.creator_id,
      text: mood.text,
      emotion: mood.emotion,
    };
  }

  async updateMood(
    moodId: string,
    creation_date: Date,
    creator_name: string,
    creator_id: string,
    text: string,
    emotion: string,
  ) {
    const updatedMood = await this.findMood(moodId);

    if (creation_date) {
      updatedMood.creation_date = creation_date;
    }
    if (text) {
      updatedMood.text = text;
    }
    if (emotion) {
      updatedMood.emotion = emotion;
    }
    if (creator_id) {
      updatedMood.creator_id = creator_id;
    }
    if (creator_name) {
      updatedMood.creator_name = creator_name;
    }
    await updatedMood.save();
  }

  async deleteMood(moodId: string) {
    const result = await this.moodModel.deleteOne({ _id: moodId }).exec();
    console.log(result);
  }

  async getMoodToUser(creator_id: string, emotion: string) {
    let mood;

    try {
      mood = await this.moodModel.find({
        creator_id: creator_id,
        emotion: emotion,
      });
    } catch (error) {
      throw new NotFoundException('Could not find mood');
    }
    if (!mood) {
      throw new NotFoundException('Could not find Mood');
    }
    return mood;
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
