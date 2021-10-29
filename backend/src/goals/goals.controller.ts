import {Body, Controller, Get, Post, Param, Patch, Delete} from "@nestjs/common";
import {GoalsService} from "./goals.service";

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  addGoals(
    @Body('title') goalTitle: string,
    @Body('description') goalDesc: string,
    @Body('price') goalPrice: number,
  ): any {
    const generatedId = this.goalsService.insertGoals(
      goalTitle,
      goalDesc,
      goalPrice);
    return {id: generatedId};
  }

  @Get()
  getAllGoals() {
    return this.goalsService.getGoals();
  }

  @Get(':id')
  getGoal(@Param('id') goalId: string,) {
    return this.goalsService.getSingleGoal(goalId);
  }

  @Patch(':id')
  updateGoal(
    @Param('id') goalId: string,
    @Body('title') goalTitle: string,
    @Body('description') goalDesc: string,
    @Body('price') goalPrice: number
  ) {
    this.goalsService.updateGoal(goalId, goalTitle, goalDesc, goalPrice);
    return null;
  }

  @Delete(':id')
  removeGoal(@Param('id') goalId: string) {
    this.goalsService.deleteGoal(goalId);
    return null;
  }
}
