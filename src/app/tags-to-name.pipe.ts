import { Pipe, PipeTransform, inject } from '@angular/core';
import { TagsState } from './foods/tags.state';



@Pipe({
  name: 'tagsToName'
})
export class TagsToNamePipe implements PipeTransform {
  tagsState = inject(TagsState);
  tagsArray: string[];
  tags$ = this.tagsState.tags$;

  tagsName = ['Fruit', 'Vegetable', 'Meat', 'Bread', 'Dairy', 'Egg', 'Gluten', 'Soy', 'Nuts', 'Peanuts', 'Lactose', 'Sugar', 'Salt', 'Alcohol', 'Tobacco', 'Other'];

  transform(value: any) {
    // this.tags$.subscribe((data) => {
    //   this.tagsArray = data.map(tag => tag.name);
    // })
    return this.tagsName[value];
  }
}

