import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:1234@localhost:27017/'),
    CatsModule,
  ],
})
export class AppModule {}
