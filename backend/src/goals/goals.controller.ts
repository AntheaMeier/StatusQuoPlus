import { GoalsService } from './goals.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  async addGoals(
    @Body('description') goalDesc: string,
    @Body('order') goalOrder: string,
    @Body('userid') goalUserid: string,
    @Body('completed') goalCompleted: boolean,
  ) {
    const generatedId = await this.goalsService.insertGoals(
      goalDesc,
      goalOrder,
      goalUserid,
      goalCompleted
    );
    return { id: generatedId };
  }

  @Get()
  async getAllGoals() {
    const goals = await this.goalsService.getGoals();
    return goals;
  }

  @Get(':id')
  getGoal(@Param('id') goalId: string) {
    return this.goalsService.getSingleGoal(goalId);
  }

  @Patch(':id')
  async updateGoal(
    @Param('id') goalId: string,
    @Body('description') goalDesc: string,
    @Body('userid') goalUserid: string,
    @Body('completed') goalCompleted: boolean,
  ) {
    await this.goalsService.updateGoal(goalId, goalDesc, goalUserid, goalCompleted);
    return null;
  }

  @Patch(':order/:id')
  async updateGoalOrder(
    @Param('id') goalId: string,
    @Body('order') goalOrder: string,
  ) {
    await this.goalsService.updateGoalOrder(goalId, goalOrder);
    return null;
  }

  @Delete(':id')
  async removeGoal(@Param('id') goalId: string) {
    await this.goalsService.deleteGoal(goalId);
    return null;
  }

  @Get('user/:userid/:completed')
  async getAllGoalsToUser(
    @Param('userid') userid: string,
    @Param('completed') completed: boolean,

  ){
    const goals = await this.goalsService.getGoalsToUser(userid, completed);
    return goals;
  }
}
