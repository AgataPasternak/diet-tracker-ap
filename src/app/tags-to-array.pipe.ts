import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsToArray'
})
export class TagsToArrayPipe implements PipeTransform {

  transform(value: string): string[] {
    return value.split(',');
  }

}
