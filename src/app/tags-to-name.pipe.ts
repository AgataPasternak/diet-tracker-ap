import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsToName'
})
export class TagsToNamePipe implements PipeTransform {
  tagsName = ['Fruit', 'Vegetable', 'Meat', 'Bread', 'Dairy', 'Egg', 'Gluten', 'Soy', 'Nuts', 'Peanuts', 'Lactose', 'Sugar', 'Salt', 'Alcohol', 'Tobacco', 'Others'];

  transform(value: []) {
    if (value === undefined) {
      return '-';
    } else {
      const valueReturn = value.map((element) => {
        return this.tagsName[element - 1];
      })
      return valueReturn.join(', ');
    }
  }
}

