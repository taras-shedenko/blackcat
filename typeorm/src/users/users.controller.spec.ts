import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let users: User[];
  let usersService: Omit<UsersService, 'userRepository'>;

  beforeEach(async () => {
    users = [
      {
        id: 1,
        firstName: 'Name1',
        lastName: 'Lastname1',
        isActive: true,
        photos: [],
      },
      {
        id: 2,
        firstName: 'Name2',
        lastName: 'Lastname2',
        isActive: true,
        photos: [],
      },
    ];

    usersService = {
      findAll: jest.fn(() => Promise.resolve(users)),
      findOne: jest.fn(() => Promise.resolve(users[0])),
      create: jest.fn((user) =>
        Promise.resolve({
          id: 0,
          ...user,
          isActive: !!user.isActive,
          photos: [],
        }),
      ),
      createMany: jest.fn(),
      update: jest.fn((id, user) =>
        Promise.resolve({
          id: id,
          ...user,
          isActive: !!user.isActive,
          photos: [],
        }),
      ),
      remove: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const res = await controller.findAll();
      expect(res).toEqual(users);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item', async () => {
      const res = await controller.findOne(1);
      expect(res).toEqual(users[0]);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create an item', async () => {
      const res = await controller.create({
        firstName: 'New',
        lastName: 'Last',
      });
      expect(res).toEqual({
        id: 0,
        firstName: 'New',
        lastName: 'Last',
        isActive: false,
        photos: [],
      });
      expect(usersService.create).toHaveBeenCalledWith({
        firstName: 'New',
        lastName: 'Last',
      });
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const res = await controller.update(1, {
        firstName: 'New',
        lastName: 'Last',
      });
      expect(res).toEqual({
        id: 1,
        firstName: 'New',
        lastName: 'Last',
        isActive: false,
        photos: [],
      });
      expect(usersService.update).toHaveBeenCalledWith(1, {
        firstName: 'New',
        lastName: 'Last',
      });
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      const res = await controller.remove(1);
      expect(res).toBeUndefined();
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
