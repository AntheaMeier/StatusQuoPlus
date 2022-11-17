import {GoalsService} from './goals.service';
import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  async addGoals(
    @Body('description') goalDesc: string,
    @Body('userid') goalUserid: string,
    @Body('priority') goalPriority: boolean,
  ) {
    const generatedId = await this.goalsService.insertGoals(
      goalDesc,
      goalUserid,
      goalPriority,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllGoals() {
    return await this.goalsService.getGoals();
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
    @Body('priority') goalPriority: boolean,
  ) {
    await this.goalsService.updateGoal(
      goalId,
      goalDesc,
      goalUserid,
      goalPriority,
    );
    return null;
  }

  @Delete(':id')
  async removeGoal(@Param('id') goalId: string) {
    await this.goalsService.deleteGoal(goalId);
    return null;
  }

  @Get('user/:userid')
  async getAllGoalsToUser(@Param('userid') userid: string) {
    return await this.goalsService.getGoalsToUser(userid);
  }
}
