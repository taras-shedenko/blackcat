import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configDchema from '../config/schema';
import databaseConfig from '../config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configDchema,
      validatePredefined: false,
      validationOptions: { allowUnknown: false },
      validate: (config: Record<string, any>) => {
        console.log('CONFIG: ', config);
        return config;
      },
      envFilePath: ['config/local.dev.env', 'config/dev.env'],
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
