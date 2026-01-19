import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  findAll() {
    return this.catModel.find();
  }

  findOne(id: string) {
    return this.catModel.findById(id);
  }

  create(catDto: CatDto) {
    return this.catModel.create(catDto);
  }

  async update(id: string, catDto: CatDto) {
    await this.catModel.findByIdAndUpdate(id, catDto);
    return this.catModel.findById(id);
  }

  async remove(id: string) {
    await this.catModel.findByIdAndDelete(id);
  }
}
