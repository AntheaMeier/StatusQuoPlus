import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
});

export interface Users extends mongoose.Document{
  id: number;
  name: string;
  username: string;
  password: string;
}
