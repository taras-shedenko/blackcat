import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserSchema } from './entities/user.entity.schema';
import { PhotoSchema } from './entities/photo.entity.schema';
import { UsersService } from './users.service';
import { UsersSubscriber } from './users.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, PhotoSchema])],
  controllers: [UsersController],
  providers: [UsersService, UsersSubscriber],
})
export class UsersModule {}
