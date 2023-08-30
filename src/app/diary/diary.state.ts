import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, delay, map, take } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry } from './diary.model';
import { DiaryService } from './diary.service';


@Injectable({
    providedIn: 'root'
})

export class DiaryState {
    private diarySource$ = new Subject<ApiResponse<DiaryEntry>>;
    diary$ = this.diarySource$.asObservable();

    private diaryByDateSource$ = new BehaviorSubject<ApiResponse<DiaryEntry>>({
        data: [],
        length: 0
    });
    diaryByDate$ = this.diaryByDateSource$.asObservable();

    diaryLength$ = this.diaryByDateSource$.pipe(map((data) => data.length));

    private diaryService = inject(DiaryService);

    getDiaryEntries(): void {
        this.diaryService
            .getDiaryEntries()
            .pipe(take(1))
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

    postDiaryItem(diary: DiaryEntry): void {
        this.diaryService
            .postDiary(diary)
            .pipe(take(1), delay(1000))
            .subscribe(() => {
                this.getDiaryEntries();
            });
    }

    getDiaryByDate(date: string): void {
        this.diaryService.getDiaryByDate(date).subscribe((data) => {
            this.diaryByDateSource$.next(data);
        })
    }

    getDiaryById(id: string): void {
        this.diaryService.getDiaryById(id)
            .pipe(take(1))
            .subscribe({
                next: (data) => {
                    this.diaryByDateSource$.next(data);
                },
                error: (error) => {
                    console.log("Error fetching diary by ID:", error);
                },
                complete: () => {
                }
            });
    }

    deleteDiaryEntry(id: string): void {
        this.diaryService
            .deleteDiaryEntry(id)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    // this.getDiaryById(id);
                },
                error: (error) => {
                    console.log("Error delating diary entry:", error);
                },
                complete: () => {

                }
            });
    }

    deleteFoodInDiary(id: string, foodId: string): void {
        this.diaryService
            .deleteFoodInDiary(id, foodId)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    // this.getDiaryById(id);
                },
                error: (error) => {
                    console.log("Error delating food in diary:", error);
                },
                complete: () => {

                }
            });
    }
}

