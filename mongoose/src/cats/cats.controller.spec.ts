import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController,
    mockService: {
      findAll: () => void;
      findOne: () => void;
      create: () => void;
      update: () => void;
      remove: () => void;
    };
  beforeEach(async () => {
    mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [{ provide: CatsService, useValue: mockService }],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it("should call Service's findAll", async () => {
      await controller.findAll();
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it("should call Service's findOne", async () => {
      await controller.findOne('id');
      expect(mockService.findOne).toHaveBeenCalledWith('id');
    });
  });

  describe('create', () => {
    it("should call Service's create", async () => {
      await controller.create({
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
      expect(mockService.create).toHaveBeenCalledWith({
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('update', () => {
    it("should call Service's update", async () => {
      await controller.update('id', {
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
      expect(mockService.update).toHaveBeenCalledWith('id', {
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('remove', () => {
    it("should call Service's remove", async () => {
      await controller.remove('id');
      expect(mockService.remove).toHaveBeenCalledWith('id');
    });
  });
});
