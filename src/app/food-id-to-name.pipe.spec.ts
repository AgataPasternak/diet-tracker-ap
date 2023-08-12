import { FoodIdToNamePipe } from './food-id-to-name.pipe';

describe('FoodIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FoodIdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
