import { Test, TestingModule } from '@nestjs/testing';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { ConfigService } from './config.service';

jest.mock('fs');
jest.mock('dotenv');

describe.only('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        { provide: MODULE_OPTIONS_TOKEN, useValue: { dir: 'config' } },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
