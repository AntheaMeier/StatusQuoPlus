import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: String, required: true },
});

export interface Review extends mongoose.Document {
  id: string;
  date: string;
  description: string;
  userid: string;
}
