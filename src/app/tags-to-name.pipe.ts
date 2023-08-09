import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tag } from './foods/tags.model';
import { TagsState } from './foods/tags.state';

@Pipe({
  name: 'tagsToName'
})
export class TagsToNamePipe implements PipeTransform {
  tagsState = inject(TagsState);

  tags$ = this.tagsState.tags$;

  transform(tagId: string): Observable<String | undefined> {
    // this.tags$.subscribe(console.log);
    return this.tags$.pipe(
      map((tags) => {
        return tags.find((tag: Tag) => {
          return tag?.id === +tagId;
        })?.name;
      })
    );
  }
}
