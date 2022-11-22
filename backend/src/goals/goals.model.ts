import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  expiry_date: { type: Date },
  description: { type: String, required: true },
  userid: { type: String, required: true },
  priority: { type: Boolean, required: false },
});

export interface Goal extends mongoose.Document {
  id: string;
  expiry_date: Date;
  description: string;
  userid: string;
  priority: boolean;
}
