import { Feedback } from './feedback.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>) {}

  async insertFeedback(
    provider_id: string,
    receiver_id: string,
    feedback_text:string,
  ) {
    const newFeedback = new this.feedbackModel({
      provider_id: provider_id,
      receiver_id: receiver_id,
      feedback_text: feedback_text,
      });
    const result = await newFeedback.save();
    return result.id;
  }

  async getFeedbacks() {
    const feedbacks = await this.feedbackModel.find().exec();
    return feedbacks.map((feedback) => ({
      id: feedback.id,
      provider_id: feedback.provider_id,
      receiver_id: feedback.receiver_id,
      feedback_text: feedback.feedback_text,
    }));
  }

  async getFeedbackForReceiver(receiver_id:string){
    let feedbacks;

    try{
      feedbacks = await this.feedbackModel.find( { receiver_id: receiver_id } )
    }
    catch(error){
      throw new NotFoundException('Could not find task')
    }
    if (!feedbacks) {
      throw new NotFoundException('Could not find task task');
    }
    return feedbacks;
  }

  async getSingleFeedback(feedbackId: string) {
    const feedback = await this.findFeedback(feedbackId);
    return {
      id: feedback.id,
      provider_id: feedback.provider_id,
      receiver_id: feedback.receiver_id,
      feedback_text: feedback.feedback_text,
    };
  }

  private async findFeedback(id: string): Promise<Feedback> {
    let feedback;
    try {
      feedback = await this.feedbackModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find feedback.');
    }
    if (!feedback) {
      throw new NotFoundException('Could not find feeback.');
    }
    return feedback;
  }
  
}
