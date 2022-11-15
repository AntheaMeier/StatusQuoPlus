import {Goal} from "./goals.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class GoalsService {

  constructor(@InjectModel('Goal') private readonly goalModel: Model<Goal>
  ) {
  }

  async insertGoals(desc: string, order: string, userid:string, priority: boolean) {
    const newGoal = new this.goalModel({
      description: desc,
      order: order,
      userid,
      priority: priority,
    });
    const result = await newGoal.save();
    return result.id as string;
  }

  async getGoals() {
    const goals = await this.goalModel.find().exec();
    return goals.map((goal) => (
      {id: goal.id, description: goal.description, order: goal.order, userid: goal.userid, priority: goal.priority}));
  }

  async getSingleGoal(goalId: string) {
    const goal = await this.findGoal(goalId);
    return {id: goal.id, description: goal.description, order: goal.order, userid: goal.userid, priority: goal.priority};
  }

  async updateGoal(
    goalId: string,
    desc: string,
    userid: string,
    priority: boolean
  ) {
    const updatedGoal = await this.findGoal(goalId);
    if (desc) {
      updatedGoal.description = desc;
    }
    if(userid){
      updatedGoal.userid = userid;
    }
    if (priority != undefined) {
      updatedGoal.priority = priority;
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
    const result = await this.goalModel.deleteOne({_id: goalId}).exec();
    console.log(result);
  }

  async getGoalsToUser (userid: string){
    let goals;

    try{
      goals = await this.goalModel.find( { userid: userid } )
    }
    catch(error){
      throw new NotFoundException('Could not find task')
    }
    if(!goals){
      throw new NotFoundException('Could not find task task')
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
