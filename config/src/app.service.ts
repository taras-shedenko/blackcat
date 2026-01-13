import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import databaseConfig from '../config/database.config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>,
  ) {}

  getConfig(key: string): string {
    return this.configService.get(key, 'missing key');
  }
}
