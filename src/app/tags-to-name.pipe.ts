import { Pipe, PipeTransform, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { TagsState } from './foods/tags.state';

@Pipe({
  name: 'tagsToName'
})
export class TagsToNamePipe implements PipeTransform {
  tagsState = inject(TagsState);

  tags$ = this.tagsState.tags$;

  transform(value: string[]): Subject<String> {
    let tagsSubject$ = new Subject<String>();
    this.tagsState.getTags();
    this.tags$
      // .pipe(take(1))
      .subscribe((data) => {
        if (value.length == 0) {
          return;
        } else {
          value.forEach(element => {
            tagsSubject$.next(data[+element - 1].name);
          });
        }
      })

    // this.tags$.pipe(

    //   concatMap((data) => {
    //     if (value.length === 0) {
    //       return [];
    //     } else {
    //       return value.map(element => data[+element - 1].name);
    //     }
    //   })
    // ).subscribe((tag) => {
    //   tagsSubject$.next(tag);
    // });

    return tagsSubject$;
  }
}

