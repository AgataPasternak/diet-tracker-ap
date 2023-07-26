import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsToArray'
})
export class TagsToArrayPipe implements PipeTransform {

  transform(value: any) {
    value = value?.split(',');
    return value;
  }

}
