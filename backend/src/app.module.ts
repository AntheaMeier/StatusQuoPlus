import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GoalsModule} from "./goals/goals.module";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    GoalsModule,
    UsersModule,
    AuthModule,
    ReviewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Adso2:hallo@cluster0.kuzro.mongodb.net/statusquo-db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
