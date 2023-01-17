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

  async getMoodsOfTeamMember(
    supervisor_id: string,
    memberId: string,
    startDate: Date,
    endDate: Date,
  ) {
    let moods;
    const startDateTemp = new Date(startDate);
    const endDateTemp = new Date(endDate);

    try {
      if (memberId != 'undefined') {
        console.log('member ooo' + memberId);
        moods = await this.moodModel.find({ creator_id: memberId });
      } else {
        console.log(supervisor_id);
        moods = await this.moodModel.find({ supervisor_id: supervisor_id });
      }
      if (startDateTemp.getTime() != 0 && endDateTemp.getTime() != 0) {
        moods = this.filterMoodsToDateRange(moods, startDate, endDate);
      }
    } catch (error) {
      throw new NotFoundException('Could not find mood');
    }

    if (!moods) {
      throw new NotFoundException('Could not find mood');
    }
    return moods;
  }

  private filterMoodsToDateRange(
    moods: Mood[],
    startDate: Date,
    endDate: Date,
  ): Mood[] {
    let filteredMoods = [];
    const startDateTemp = new Date(startDate).getTime();
    const endDateTemp = new Date(endDate).getTime();

    filteredMoods = moods.filter((mood) => {
      const date = new Date(mood.creation_date).getTime();
      return date >= startDateTemp && date <= endDateTemp;
    });
    return filteredMoods;
  }
}
