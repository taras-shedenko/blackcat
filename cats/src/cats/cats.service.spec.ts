/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all the items', () => {
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      const res = service.getAll();
      expect(res).toEqual([{ id: 1, name: 'Name', age: 0, breed: 'Breed' }]);
    });
  });

  describe('getOne', () => {
    it('should return specified item', () => {
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      const res = service.getOne(1);
      expect(res).toEqual({ id: 1, name: 'Name', age: 0, breed: 'Breed' });
    });

    it('should return nothing when not found', () => {
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      const res = service.getOne(2);
      expect(res).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create new item', () => {
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      service.create({ name: 'New Name', age: 0, breed: 'New Breed' });
      // @ts-expect-error
      const cats = service.cats;
      expect(cats).toEqual([
        { id: 1, name: 'Name', age: 0, breed: 'Breed' },
        { id: 2, name: 'New Name', age: 0, breed: 'New Breed' },
      ]);
    });
  });

  describe('update', () => {
    it('should update specified item', () => {
      service.create({ name: 'Name', age: 0, breed: 'Breed' });
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      service.update(1, { name: 'New Name', age: 0, breed: 'New Breed' });
      // @ts-expect-error
      const cats = service.cats;
      expect(cats).toEqual([
        { id: 1, name: 'New Name', age: 0, breed: 'New Breed' },
      ]);
    });

    it('should update nothing when not found', () => {
      service.create({ name: 'Name', age: 0, breed: 'Breed' });
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      service.update(2, { name: 'New Name', age: 0, breed: 'New Breed' });
      // @ts-expect-error
      const cats = service.cats;
      expect(cats).toEqual([{ id: 1, name: 'Name', age: 0, breed: 'Breed' }]);
    });
  });

  describe('remove', () => {
    it('should remove specified item', () => {
      // @ts-expect-error
      service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
      service.remove(1);
      // @ts-expect-error
      const cats = service.cats;
      expect(cats).toEqual([]);
    });
  });

  it('should remove nothing when not found', () => {
    // @ts-expect-error
    service.cats = [{ id: 1, name: 'Name', age: 0, breed: 'Breed' }];
    service.remove(2);
    // @ts-expect-error
    const cats = service.cats;
    expect(cats).toEqual([{ id: 1, name: 'Name', age: 0, breed: 'Breed' }]);
  });
});
