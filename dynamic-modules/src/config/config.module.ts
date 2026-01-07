import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Options } from './interfaces/options';

@Module({ providers: [ConfigService], exports: [ConfigService] })
export class ConfigModule {
  static register(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [{ provide: 'OPTIONS', useValue: options }],
    };
  }
}
