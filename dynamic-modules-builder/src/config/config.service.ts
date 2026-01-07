import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { Injectable, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { type ConfigModuleOptions } from './interfaces/config-module-options';
import { EnvConfig } from './interfaces/env-config';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: ConfigModuleOptions) {
    const fileName = `${process.env.NODE_ENV || 'development'}.conf`;
    const filePath = resolve(__dirname, '../..', options.dir, fileName);
    const file = readFileSync(filePath);
    this.envConfig = parse(file);
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
