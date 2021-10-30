import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
  // private users: Users[] = [];

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

/*  constructor(@InjectModel('Users') private readonly usersModel: Model<Users>) {}


  async insertUsers(name: string, username: string, password: string) {
    const newUser = new this.usersModel({
      name: name,
      username: username,
      password: password
    });
    const result = await newUser.save();
    return result.id;

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users as Users[];
  }

  async getSingleUser(usersId: string) {
    const users = await this.findUser(usersId);
    return {id: users.id, name: users.name, username: users.username, password: users.password};
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
  }*/

