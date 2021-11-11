import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export interface Users extends mongoose.Document {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  role: string;
  username: string;
  password: string;
}
