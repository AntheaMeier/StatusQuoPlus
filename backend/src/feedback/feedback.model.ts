import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
  provider_id: {type: String, required: true},
  receiver_id: {type:String, required: true},
  feedback_text:{type:String, required:true},
});

export interface Feedback extends mongoose.Document {
  id: string;
  provider_id: string;
  receiver_id: string;
  feedback_text: string;
}
