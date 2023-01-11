import * as mongoose from 'mongoose';

export const MoodSchema = new mongoose.Schema({
  creation_date: { type: Date, default: Date.now() },
  creator_name: {type: String},
  creator_id: {type: String},
  mood_text: {type: String},
  emotion: {type: String},
});

export interface Mood extends mongoose.Document {
  id: string;
  creation_date: Date;
  creator_name: string;
  creator_id: string;
  mood_text: string;
  emotion: string;
}
