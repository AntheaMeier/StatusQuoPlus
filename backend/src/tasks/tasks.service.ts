import {Injectable, NotFoundException} from "@nestjs/common";
import {Task} from "./task.model";
import { InjectModel } from "@nestjs/mongoose"
import {Model} from "mongoose";

@Injectable()
export class TasksService{

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
  }

  async insertTask(desc: string, status:string){
    const goalid = new Date().toString();
    const newTask = new this.taskModel({
      description: desc,
      status,
      goalid,

    });
    const result = await newTask.save()
    return result.id as string;
  }

  async getTasks(){
    const tasks = await this.taskModel.find().exec();
    return tasks.map((task) => (
      {id:task.id, description: task.description, status: task.status, goalid: task.goalid}));
  }

  async getSingleTask(taskId: string){
    const task = await this.findTask(taskId);
    return {id: task.id, description: task.description, status: task.status, goalid: task.goalid};

  }

  async updateTask(
    taskId: string, description: string, status: string, goalid: string)
  {
    const updatedTask = await this.findTask(taskId);
    if(description){
      updatedTask.description = description

    }

    if(status){
      updatedTask.status = status
    }

    if(goalid){
      updatedTask.goalid = goalid

    }

    updatedTask.save();

  }

  async deleteTask(taskId: string){
    const result = await this.taskModel.deleteOne({_id:taskId}).exec();
  }

  private async findTask(id: string): Promise<Task> {
    let task;
    try{



       task = await this.taskModel.findById(id);

    }
    catch(error){
      throw new NotFoundException('Could not find task')
    }

    if(!task){
      throw new NotFoundException('Could not find task task')

    }

    return task;

  }


}
