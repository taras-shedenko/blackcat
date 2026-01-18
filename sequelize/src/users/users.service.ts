import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  create(userDto: UserDto) {
    return this.userModel.create({
      ...userDto,
      isActive: userDto.isActive ?? true,
    });
  }

  async createMany(users: UserDto[]) {
    try {
      await this.sequelize.transaction(async (transaction) => {
        for (const user of users) {
          await this.userModel.create(
            { ...user, isActive: user.isActive ?? true },
            { transaction },
          );
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async update(id: number, userDto: UserDto) {
    await this.userModel.update(userDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) await user.destroy();
  }
}
