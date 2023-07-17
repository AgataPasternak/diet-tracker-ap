import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Injectable({
    providedIn: 'root'
})
export class TagsState {
    private tagsSource$ = new Subject<Tag[]>();
    tags$ = this.tagsSource$.asObservable();

    tagsService = inject(TagsService);

    getTags(): void {
        this.tagsService.getTags().subscribe({
            next: (data) => {
                this.tagsSource$.next(data.data);
            }
        });
    }

}
