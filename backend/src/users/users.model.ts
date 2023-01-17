import * as mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  userid: {type: String, required:true},
  firstname: {type: String},
  surname: {type: String},
} ,{ _id : false });


export const UsersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},

  firstname: {type: String, required: true},
  surname: {type: String, required: true},

  email: {type: String, required: true},
  role: {type: String, required: true},
  team: {type: [TeamSchema]},
  supervisor_id: {type: String}
});

export interface Users extends mongoose.Document {
  id: string;

  username: string;
  password: string;

  firstname: string;
  surname: string;

  email: string;
  role: string;
  team: Team;
  supervisor_id: string;
}

export interface Team extends mongoose.Document {
  userid: string;
  firstname: string;
  surname: string;
}
