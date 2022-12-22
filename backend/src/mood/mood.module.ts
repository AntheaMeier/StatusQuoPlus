import { Module } from '@nestjs/common';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodSchema } from './mood.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Mood', schema: MoodSchema }])],
  controllers: [MoodController],
  providers: [MoodService],
})
export class MoodModule {}
