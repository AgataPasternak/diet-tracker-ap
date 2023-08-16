import { Injectable, inject } from '@angular/core';
import { Subject, delay, take } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry } from './diary.model';
import { DiaryService } from './diary.service';


@Injectable({
    providedIn: 'root'
})

export class DiaryState {
    private diarySource$ = new Subject<ApiResponse<DiaryEntry>>;
    diary$ = this.diarySource$.asObservable();

    private diaryByDateSource$ = new Subject<ApiResponse<DiaryEntry>>;
    diaryByDate$ = this.diaryByDateSource$.asObservable();

    private diaryService = inject(DiaryService);

    getDiaryEntries(): void {
        this.diaryService
            .getDiaryEntries()
            .subscribe({
                next: (data) => {
                    this.diarySource$.next(data);
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {

                }
            });
    }

    getDiaryByDate(date: string): void {
        this.diaryService.getDiaryByDate(date).subscribe((data) => {
            this.diaryByDateSource$.next(data);
        })
    }

    postDiaryItem(diary: DiaryEntry): void {
        //  this.postLoading$.next(true);
        this.diaryService
            .postDiary(diary)
            .pipe(take(1), delay(1000))
            .subscribe(() => {
                this.getDiaryEntries();
                //this.postLoading$.next(false);
            });
    }
}
