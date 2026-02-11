import { CatDto } from './cats.dto';

describe('CatDto', () => {
  it('should be defined', () => {
    expect(new CatDto()).toBeDefined();
  });
});
