import { FeedbackService } from './feedback.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async addFeedbacks(
    @Body('provider_id') feedbackProviderId: string,
    @Body('receiver_id') feedbackReceiverId: string,
    @Body('feedback_text') feedbackFeedbackText: string,
  ) {
    console.log(feedbackProviderId + " " + feedbackFeedbackText);
    const generatedId = await this.feedbackService.insertFeedback(
      feedbackProviderId,
      feedbackReceiverId,
      feedbackFeedbackText
    );
    return { id: generatedId };
  }

  @Get()
  async getAllFeedback() {
    return await this.feedbackService.getFeedbacks();
  }

  @Get(':id')
  getFeedback(@Param('id') feedbackId: string) {
    return this.feedbackService.getSingleFeedback(feedbackId);
  }

  @Get('receiver/:receiver_id')
  async getAllFeedbacksForReceiver(
    @Param('receiver_id') receiver_id: string) {
    return await this.feedbackService.getFeedbackForReceiver(receiver_id);
  }
 
}
