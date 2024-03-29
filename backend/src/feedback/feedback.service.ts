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
    feedback_date: Date,
    
  ) {
    const newFeedback = new this.feedbackModel({
      provider_id: provider_id,
      receiver_id: receiver_id,
      feedback_text: feedback_text,
      feedback_date: feedback_date,
    
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
      feedback_date: feedback.feedback_date,
     
    }));
  }

  async getFeedbackForReceiver(receiver_id:string){
    let feedbacks;

    try{
      feedbacks = await this.feedbackModel.find( { receiver_id: receiver_id } )
    }
    catch(error){
      throw new NotFoundException('Could not find feedback');
    }
    if (!feedbacks) {
      throw new NotFoundException('Could not find feedback');
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
      feedback_date: feedback.feedback_date,
     
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
      throw new NotFoundException('Could not find feedback.');
    }
    return feedback;
  }

}
