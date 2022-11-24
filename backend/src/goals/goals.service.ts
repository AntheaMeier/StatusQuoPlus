import { Goal } from './goals.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GoalsService {
  constructor(@InjectModel('Goal') private readonly goalModel: Model<Goal>) {}

  async insertGoals(
    expiry_date: Date,
    desc: string,
    userid: string,
    priority: boolean,
  ) {
  }

  async insertGoals(
    desc: string,
    expiry_date: Date,
    userid: string,
    priority: boolean,
    completed: boolean
  ) {
    const newGoal = new this.goalModel({
      expiry_date,
      description: desc,
      userid,
      priority: priority,
      completed: completed,
    });
    const result = await newGoal.save();
    return result.id;
  }

  async getGoals() {
    const goals = await this.goalModel.find().exec();
    return goals.map((goal) => ({
      id: goal.id,
      expiry_date: goal.expiry_date,
      description: goal.description,
      userid: goal.userid,
      priority: goal.priority,
      completed: goal.completed
    }));
  }

  async getSingleGoal(goalId: string) {
    const goal = await this.findGoal(goalId);
    return {
      id: goal.id,
      expiry_date: goal.expiry_date,
      description: goal.description,
      userid: goal.userid,
      priority: goal.priority,
      completed: goal.completed
    };
  }

  async updateGoal(
    goalId: string,
    removeExpiryDate: boolean,
    expiry_date: Date,
    desc: string,
    userid: string,
    priority: boolean,
    completed: boolean,
  ) {
    const updatedGoal = await this.findGoal(goalId);

    if (expiry_date && !removeExpiryDate) {
      updatedGoal.expiry_date = expiry_date;
    }
    if (removeExpiryDate) {
      console.log('!!!! removed expiry date');
      updatedGoal.expiry_date = undefined;
    }
    if (desc) {
      updatedGoal.description = desc;
    }
    if(userid){
      updatedGoal.userid = userid;
    }
    if (priority != undefined) {
      updatedGoal.priority = priority;
    }
    if (completed != undefined) {
      updatedGoal.completed = completed;
    }
    await updatedGoal.save();
  }

  async deleteGoal(goalId: string) {
    const result = await this.goalModel.deleteOne({ _id: goalId }).exec();
    console.log(result);
  }

  async getGoalsToUser (userid: string, completed: boolean){
    let goals;

    try{
      goals = await this.goalModel.find( { userid: userid, completed: completed } )
    }
    catch(error){
      throw new NotFoundException('Could not find task')
    }
    if (!goals) {
      throw new NotFoundException('Could not find task task');
    }
    return goals;
  }

  private async findGoal(id: string): Promise<Goal> {
    let goal;
    try {
      goal = await this.goalModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find goal.');
    }
    if (!goal) {
      throw new NotFoundException('Could not find goal.');
    }
    return goal;
  }
}
