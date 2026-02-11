import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatDto } from './cats.dto';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call getAll service', () => {
      jest
        .spyOn(service, 'getAll')
        .mockImplementation(() => [
          { id: 1, name: 'Name', age: 1, breed: 'Breed' },
        ]);
      const res = controller.getAll('name');
      expect(res).toEqual([{ id: 1, name: 'Name', age: 1, breed: 'Breed' }]);
    });
  });

  describe('getOne', () => {
    it('should call getOne service', () => {
      jest.spyOn(service, 'getOne').mockImplementation(() => ({
        id: 1,
        name: 'Name',
        age: 1,
        breed: 'Breed',
      }));
      const res = controller.getOne(1, 'name');
      expect(res).toEqual({
        id: 1,
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('create', () => {
    it('should call create service', () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation((cat: CatDto) => ({ id: 1, ...cat }));
      const res = controller.create({
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
      expect(res).toEqual({
        id: 1,
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('update', () => {
    it('should call create service', () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation((id, catDto: CatDto) => ({ id, ...catDto }));
      const res = controller.update(1, {
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
      expect(res).toEqual({
        id: 1,
        name: 'Name',
        age: 1,
        breed: 'Breed',
      });
    });
  });

  describe('remove', () => {
    it('should call remove service', () => {
      jest.spyOn(service, 'remove').mockImplementation(() => {});
      const res = controller.remove(1);
      expect(res).toBeUndefined();
    });
  });
});
