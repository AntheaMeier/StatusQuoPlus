import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  expiry_date: { type: String },
  description: { type: String, required: true },
  order: { type: String, required: false },
  userid: { type: String, required: true },
});

export interface Goal extends mongoose.Document {
  id: string;
  expiry_date: string;
  description: string;
  order: string;
  userid: string;
}
