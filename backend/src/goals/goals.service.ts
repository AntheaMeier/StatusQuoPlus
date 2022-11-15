import { Goal } from './goals.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GoalsService {
  constructor(@InjectModel('Goal') private readonly goalModel: Model<Goal>) {}

  async insertGoals(
    expiry_date: string,
    desc: string,
    order: string,
    userid: string,
  ) {
    const newGoal = new this.goalModel({
      expiry_date,
      description: desc,
      order: order,
      userid,
    });
    const result = await newGoal.save();
    return result.id as string;
  }

  async getGoals() {
    const goals = await this.goalModel.find().exec();
    return goals.map((goal) => ({
      id: goal.id,
      expiry_date: goal.expiry_date,
      description: goal.description,
      order: goal.order,
      userid: goal.userid,
    }));
  }

  async getSingleGoal(goalId: string) {
    const goal = await this.findGoal(goalId);
    return {
      id: goal.id,
      expiry_date: goal.expiry_date,
      description: goal.description,
      order: goal.order,
      userid: goal.userid,
    };
  }

  async updateGoal(
    goalId: string,
    expiry_date: string,
    desc: string,
    userid: string,
  ) {
    const updatedGoal = await this.findGoal(goalId);
    if (expiry_date) {
      updatedGoal.expiry_date = expiry_date;
    }
    if (desc) {
      updatedGoal.description = desc;
    }
    if (userid) {
      updatedGoal.userid = userid;
    }
    await updatedGoal.save();
  }

  async updateGoalOrder(goalId: string, order: string) {
    const updatedGoalOrder = await this.findGoal(goalId);
    if (order) {
      updatedGoalOrder.order = order;
    }
    await updatedGoalOrder.save();
  }

  async deleteGoal(goalId: string) {
    const result = await this.goalModel.deleteOne({ _id: goalId }).exec();
    console.log(result);
  }

  async getGoalsToUser(userid: string) {
    let goals;

    try {
      goals = await this.goalModel.find({ userid: userid });
    } catch (error) {
      throw new NotFoundException('Could not find task');
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
