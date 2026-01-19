import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';

describe('CatsService', () => {
  let service: CatsService,
    mockModel: {
      find: () => void;
      findById: () => void;
      create: () => void;
      findByIdAndUpdate: () => void;
      findByIdAndDelete: () => void;
    };

  beforeEach(async () => {
    mockModel = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: getModelToken(Cat.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it("should call Model's find", async () => {
      await service.findAll();
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it("should call Model's find", async () => {
      await service.findOne('id');
      expect(mockModel.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('create', () => {
    it("should call Model's find", async () => {
      await service.create({ name: 'Name', age: 1, breed: 'Breed' });
      expect(mockModel.create).toHaveBeenCalledWith({
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('update', () => {
    it("should call Model's find", async () => {
      await service.update('id', { name: 'Name', age: 1, breed: 'Breed' });
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id', {
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
      expect(mockModel.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('remove', () => {
    it("should call Model's find", async () => {
      await service.remove('id');
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id');
    });
  });
});
