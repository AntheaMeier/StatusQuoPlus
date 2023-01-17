import * as mongoose from 'mongoose';

export const MoodSchema = new mongoose.Schema({
  creation_date: { type: Date, default: Date.now() },
  creator_name: {type: String},
  creator_id: {type: String},
  emotion: {type: String},
  text: {type: String},
  hidden: {type: Boolean},
  supervisor_id: { type: String },
});

export interface Mood extends mongoose.Document {
  id: string;
  creation_date: Date;
  creator_name: string;
  creator_id: string;
  emotion: string;
  text: string;
  hidden: boolean;
  supervisor_id: string;
}
