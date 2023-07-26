import { Pipe, PipeTransform, inject } from '@angular/core';
import { TagsState } from './foods/tags.state';

@Pipe({
  name: 'tagsToName'
})
export class TagsToNamePipe implements PipeTransform {
  tagsState = inject(TagsState);
  tagsArray: string[];
  tags$ = this.tagsState.tags$;

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

