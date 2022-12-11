import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalsModule } from './goals/goals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FeedbackModule } from './feedback/feedback.module';


@Module({
  imports: [
    GoalsModule,
    UsersModule,
    AuthModule,
    TasksModule,
    ReviewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://ela:elaElaela@cluster0.brai3fu.mongodb.net/statusquoplus?retryWrites=true&w=majority',
    ),
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
