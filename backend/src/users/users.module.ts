import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  // imports: [MongooseModule.forFeature([{name: 'Users', schema: UsersSchema}])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

