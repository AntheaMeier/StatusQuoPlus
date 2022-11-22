import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  expiry_date: { type: Date },
  description: { type: String, required: true },
  order: { type: String, required: false },
  userid: { type: String, required: true },
});

export interface Goal extends mongoose.Document {
  id: string;
  expiry_date: Date;
  description: string;
  order: string;
  userid: string;
}
