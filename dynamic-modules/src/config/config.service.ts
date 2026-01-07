import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { Injectable, Inject } from '@nestjs/common';
import { type Options } from './interfaces/options';
import { EnvConfig } from './interfaces/env-config';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  constructor(@Inject('OPTIONS') options: Options) {
    const fileName = `${process.env.NODE_ENV || 'development'}.conf`;
    const filePath = resolve(__dirname, '../..', options.dir, fileName);
    const file = readFileSync(filePath);
    this.envConfig = parse(file);
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
