import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let users: Pick<
    User,
    'id' | 'firstName' | 'lastName' | 'isActive' | 'destroy'
  >[];
  let repository: Pick<
    typeof User,
    'findAll' | 'findOne' | 'create' | 'update'
  >;

  beforeEach(async () => {
    users = [
      {
        id: 1,
        firstName: 'Name1',
        lastName: 'Lastname1',
        isActive: true,
        destroy: jest.fn(),
      },
      {
        id: 2,
        firstName: 'Name2',
        lastName: 'Lastname2',
        isActive: true,
        destroy: jest.fn(),
      },
    ];

    repository = {
      findAll: jest.fn().mockResolvedValue(users),
      findOne: jest.fn().mockResolvedValue(users[0]),
      create: jest.fn((userDto) =>
        Promise.resolve({ id: 0, ...userDto }),
      ) as typeof User.create,
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User), useValue: repository },
        { provide: Sequelize, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const res = await service.findAll();
      expect(res).toEqual(users);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item', async () => {
      const res = await service.findOne(1);
      expect(res).toEqual(users[0]);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create an item', async () => {
      const res = await service.create({
        firstName: 'New',
        lastName: 'Last',
      });
      expect(res).toEqual({
        id: 0,
        firstName: 'New',
        lastName: 'Last',
        isActive: true,
      });
      expect(repository.create).toHaveBeenCalledWith({
        firstName: 'New',
        lastName: 'Last',
        isActive: true,
      });
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      await service.update(1, {
        firstName: 'New',
        lastName: 'Last',
      });
      expect(repository.update).toHaveBeenCalledWith(
        {
          firstName: 'New',
          lastName: 'Last',
        },
        { where: { id: 1 } },
      );
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      const res = await service.remove(1);
      expect(res).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(users[0].destroy).toHaveBeenCalled();
    });
  });
});
