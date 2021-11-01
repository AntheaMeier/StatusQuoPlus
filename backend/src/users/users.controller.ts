import {UsersService} from "./users.service";
import {Body, Controller, Delete, Get, Param, Patch, Post,} from "@nestjs/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUsers(
    @Body('name') usersName: string,
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string,
  ) {
    const generatedId = await this.usersService.insertUsers(
      usersName,
      usersUsername,
      usersPassword,
    );
    return {id: generatedId};
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUsers(@Param('id') usersId: string,) {
    return this.usersService.getSingleUser(usersId);
  }

  @Patch(':id')
  async updateUsers(
    @Param('id') usersId: string,
    @Body('name') usersName: string,
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string
  ) {
    await this.usersService.updateUsers(usersId, usersName, usersUsername, usersPassword);
    return null;
  }

  @Delete(':id')
  async removeUsers(@Param('id') usersId: string) {
    await this.usersService.deleteUsers(usersId);
    return null;
  }
}
