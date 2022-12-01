import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
  provider_id: {type: String},
  receiver_id: {type:String},
  feedback_text:{type:String},
});

export interface Feedback extends mongoose.Document {
  id: string;
  provider_id: string;
  receiver_id: string;
  feedback_text: string;
}
