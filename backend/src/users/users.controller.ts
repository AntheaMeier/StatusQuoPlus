import {UsersService} from "./users.service";
import {Body, Controller, Delete, Get, Param, Patch, Post,} from "@nestjs/common";
import {Team} from "./users.model";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async addUsers(
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string,
    @Body('firstname') usersFirstname: string,
    @Body('surname') usersSurname: string,
    @Body('email') usersEmail: string,
    @Body('role') usersRole: string,
    @Body('team') usersTeam: Team,
  ) {
    const generatedId = await this.usersService.insertUsers(
      usersUsername,
      usersPassword,
      usersFirstname,
      usersSurname,
      usersEmail,
      usersRole,
      usersTeam
    );
    return {id: generatedId};
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  getUsers(@Param('id') usersId: string,) {
    return this.usersService.getSingleUser(usersId);
  }

  @Patch(':id')
  async updateUsers(
    @Param('id') usersId: string,
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string,
    @Body('firstname') usersFirstname: string,
    @Body('surname') usersSurname: string,
    @Body('email') usersEmail: string,
    @Body('role') usersRole: string,
    @Body('team') usersTeam: Team
) {
    await this.usersService.updateUsers(usersId, usersUsername, usersPassword, usersFirstname, usersSurname, usersEmail, usersRole, usersTeam);
    return null;
  }

  @Delete(':id')
  async removeUsers(@Param('id') usersId: string) {
    await this.usersService.deleteUsers(usersId);
    return null;
  }
}
