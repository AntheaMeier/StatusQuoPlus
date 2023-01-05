import * as mongoose from 'mongoose';

export const MoodSchema = new mongoose.Schema({
  creation_date: { type: Date, default: Date.now() },
  creator_name: {type: String},
  creator_id: {type: String},
  text: {type: String},
  emotion: {type: String},
  supervisor_id: { type: String },
});

export interface Mood extends mongoose.Document {
  id: string;
  creation_date: Date;
  creator_name: string;
  creator_id: string;
  text: string;
  emotion: string;
  supervisor_id: string;
}
