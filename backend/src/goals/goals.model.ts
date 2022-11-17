import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  description: { type: String, required: true },
  userid: { type: String, required: true },
  priority: { type: Boolean, required: false },
});

export interface Goal extends mongoose.Document {
  id: string;
  description: string;
  userid: string;
  priority: boolean;
}
