import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { CatsModule } from '../src/cats/cats.module';
import { CatsService } from '../src/cats/cats.service';
import { CatDto } from '../src/cats/cats.dto';

describe('Cats', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue({
        getAll: () => [
          {
            id: 1,
            name: 'Name',
            age: 1,
            breed: 'Breed',
          },
        ],
        getOne: () => ({
          id: 1,
          name: 'Name',
          age: 1,
          breed: 'Breed',
        }),
        create: (cat: CatDto) => ({ id: 1, ...cat }),
        update: (id: number, cat: CatDto) => ({ id: 1, ...cat }),
        remove: () => {},
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /cats', () => {
    it('should return list of items', () => {
      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect([
          {
            id: 1,
            name: 'Name',
            age: 1,
            breed: 'Breed',
          },
        ]);
    });
  });

  describe('GET /cats/1', () => {
    it('should return specified items', () => {
      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect([
          {
            id: 1,
            name: 'Name',
            age: 1,
            breed: 'Breed',
          },
        ]);
    });
  });

  describe('POST /cats', () => {
    it('should return created item', () => {
      return request(app.getHttpServer())
        .post('/cats')
        .send({ name: 'Name', age: 1, breed: 'Breed' })
        .expect(201)
        .expect({ id: 1, name: 'Name', age: 1, breed: 'Breed' });
    });
  });

  describe('PUT /cats/1', () => {
    it('should return updated item', () => {
      return request(app.getHttpServer())
        .put('/cats/1')
        .send({ name: 'Name', age: 1, breed: 'Breed' })
        .expect(200)
        .expect({ id: 1, name: 'Name', age: 1, breed: 'Breed' });
    });
  });

  describe('DELETE /cats/1', () => {
    it('should return nothing', () => {
      return request(app.getHttpServer()).delete('/cats/1').expect(204);
    });
  });
});
