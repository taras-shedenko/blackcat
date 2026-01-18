import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Photo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
