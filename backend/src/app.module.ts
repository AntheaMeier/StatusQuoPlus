import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GoalsModule} from "./goals/goals.module";
import { MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    GoalsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Adso2:hallo@cluster0.kuzro.mongodb.net/statusquo-db?retryWrites=true&w=majority',
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
