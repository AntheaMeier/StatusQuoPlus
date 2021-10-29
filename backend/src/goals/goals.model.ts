import * as mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
});

export interface Goal {
  id: string;
  title: string;
  description: string;
  price: number;
}
