import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DiaryResponse } from './diary.model';
import { DiaryService } from './diary.service';


@Injectable({
    providedIn: 'root'
})

export class DiaryState {
    private diarySource$ = new Subject<DiaryResponse>;
    diary$ = this.diarySource$.asObservable();

    private diaryService = inject(DiaryService);

    getDiaryEntries(): void {
        this.diaryService
            .getDiaryEntries()
            .subscribe({
                next: (data) => {
                    this.diarySource$.next(data);
                    console.log(data);
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {

                }
            });
    }
}
