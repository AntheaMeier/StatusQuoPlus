import { Goal} from "./goals.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class GoalsService {
  private goals: Goal[] = [];

  constructor(@InjectModel('Goal') private readonly goalModel: Model<Goal>
  ) {}

  async insertGoals(title: string, desc: string, price: number) {
    const newGoal = new this.goalModel({
      title: title,
      description: desc,
      price: price
    });
    const result = await newGoal.save();
    console.log(result);
    return 'goalId';
  }

  getGoals() {
    return [...this.goals];
  }

  getSingleGoal(goalId: string) {
    const goal = this.findGoal(goalId)[0];
    return {...goal};
  }

  updateGoal(goalId: string, title: string, desc: string, price: number) {
    const [goal, index] = this.findGoal(goalId);
    const updatedGoal = {...goal};
    if (title) {
      updatedGoal.title = title;
    }
    if (desc) {
      updatedGoal.description = desc;
    }
    if (price) {
      updatedGoal.price = price;
    }
    this.goals[index] = updatedGoal;
  }

  deleteGoal(goalId: string) {
    const index = this.findGoal(goalId)[1];
    this.goals.splice(index, 1);
  }

  private findGoal(id: string): [Goal, number] {
    const goalIndex = this.goals.findIndex((goal) => goal.id == id)
    const goal = this.goals[goalIndex];
    if (!goal) {
      throw new NotFoundException('Could not find product.');
    }
    return [goal, goalIndex];
  }
}
