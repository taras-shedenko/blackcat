import { Test, TestingModule } from '@nestjs/testing';
import type { Request, Response, NextFunction } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        appController.getHello(
          null as any as Request,
          null as any as Response,
          null as any as NextFunction,
        ),
      ).toBe('Hello World!');
    });
  });
});
