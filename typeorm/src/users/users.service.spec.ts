import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DataSource,
  Repository,
  QueryRunner,
  EntityManager,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let users: User[];
  let repository: Pick<
    Repository<User>,
    'find' | 'findOneBy' | 'save' | 'update' | 'delete'
  >;
  let queryRunner: Pick<
    QueryRunner,
    'connect' | 'startTransaction' | 'commitTransaction' | 'release'
  > & { manager: Pick<EntityManager, 'save'> };

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

    repository = {
      find: jest.fn(() => Promise.resolve(users)),
      findOneBy: jest.fn(() => Promise.resolve(users[0])),
      save: jest.fn().mockImplementation((user: UserDto) =>
        Promise.resolve({
          id: 0,
          ...user,
          isActive: !!user.isActive,
        }),
      ),
      update: jest.fn(() => Promise.resolve({} as UpdateResult)),
      delete: jest.fn(() => Promise.resolve({} as DeleteResult)),
    };

    queryRunner = {
      connect: jest.fn().mockResolvedValue(undefined),
      startTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
      manager: { save: jest.fn().mockResolvedValue(undefined) },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: () => queryRunner,
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
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
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return all items', async () => {
      const res = await service.findOne(1);
      expect(res).toEqual(users[0]);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
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
        isActive: false,
      });
      expect(repository.save).toHaveBeenCalledWith({
        firstName: 'New',
        lastName: 'Last',
      });
    });
  });

  describe('createMany', () => {
    it('should create many items', async () => {
      const res = await service.createMany([
        {
          firstName: 'New1',
          lastName: 'Last1',
        },
        {
          firstName: 'New2',
          lastName: 'Last2',
        },
      ]);
      expect(res).toBeUndefined();
      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalledTimes(2);
      expect(
        (queryRunner.manager.save as ReturnType<typeof jest.fn>).mock.calls,
      ).toMatchObject([
        [
          {
            firstName: 'New1',
            lastName: 'Last1',
          },
        ],
        [
          {
            firstName: 'New2',
            lastName: 'Last2',
          },
        ],
      ]);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      await service.update(1, {
        firstName: 'New',
        lastName: 'Last',
      });
      expect(repository.update).toHaveBeenCalledWith(
        { id: 1 },
        {
          firstName: 'New',
          lastName: 'Last',
        },
      );
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      const res = await service.remove(1);
      expect(res).toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
