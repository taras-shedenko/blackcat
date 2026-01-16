import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: UserDto) {
    const res = await this.userRepository.save(user);
    return res;
  }

  async createMany(userDtoList: UserDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const userDto of userDtoList) {
        const user = new User();
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.isActive = userDto.isActive ?? true;
        await queryRunner.manager.save(user);
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      console.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, user: UserDto) {
    await this.userRepository.update({ id }, user);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
  }
}
