import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {Users} from "./users.model";

@Injectable()
export class UsersService {
   private users: Users[] = [];

  constructor(@InjectModel('Users') private readonly usersModel: Model<Users>) {}

  async findOne(username: string): Promise<Users | undefined> {
    return (await this.getUsers()).find(user => user.username === username);
  }

  private async findUser(id: string): Promise<Users> {
    let user;
    try {
      user = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async getSingleUser(usersId: string) {
    const users = await this.findUser(usersId);
    return {id: users.id, name: users.name, username: users.username, password: users.password};
  }

  async insertUsers(name: string, username: string, password: string) {
    const newUser = new this.usersModel({
      name: name,
      username: username,
      password: password
    });
    const result = await newUser.save();
    return result.id;
  }

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users as Users[];
  }

  async updateUsers(
    userId: string,
    name: string,
    username: string,
    password: string
  ) {
    const updatedUsers = await this.findUser(userId);
    if (name) {
      updatedUsers.name = name;
    }
    if (username) {
      updatedUsers.username = username;
    }
    if (password) {
      updatedUsers.password = password;
    }
    updatedUsers.save();
  }

  async deleteUsers(usersId: string) {
    const result = await this.usersModel.deleteOne({_id: usersId}).exec();
    console.log(result);
  }
}
