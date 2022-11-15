import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  description: { type: String, required: true },
  order: { type: String, required: false },
  userid: { type: String, required: true },
  priority: { type: Boolean, required: false },
});

export interface Goal extends mongoose.Document {
  id: string;
  description: string;
  order: string;
  userid: string;
  priority: boolean;
}
