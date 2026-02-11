import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { CatDto } from './cats.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  getAll() {
    return this.cats;
  }

  getOne(id: number) {
    return this.cats.find((cat) => cat.id === id);
  }

  create(cat: CatDto) {
    const nextId =
      this.cats.reduce(
        (currMax, cat) => (cat.id > currMax ? cat.id : currMax),
        0,
      ) + 1;
    const newCat = { id: nextId, ...cat };
    this.cats.push(newCat);
    return newCat;
  }

  update(id: number, cat: CatDto) {
    const foundCat = this.cats.find((cat) => cat.id === id);
    if (foundCat) {
      foundCat.name = cat.name;
      foundCat.age = cat.age;
      foundCat.breed = cat.breed;
    }
    return foundCat;
  }

  remove(id: number) {
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }
}
