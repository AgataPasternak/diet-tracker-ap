import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, delay, map, take } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry, FlattenDiaryEntry } from './diary.model';
import { DiaryService } from './diary.service';

@Injectable({
    providedIn: 'root'
})

export class DiaryState {
    private diarySource$ = new Subject<ApiResponse<DiaryEntry>>;
    get diary$() {
       return this.diarySource$.asObservable();
    }

    private diaryByDateSource$ = new BehaviorSubject<ApiResponse<DiaryEntry>>({
        data: [],
        length: 0
    });
    get diaryByDate$() {
        return this.diaryByDateSource$.asObservable();
    }

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
                this.getDiaryByDate(diary.date);
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
                    this.diaryByDateSource$.next({
                        data: [],
                        length: 0
                      });
                },
                error: (error) => {
                    console.log("Error delating diary entry:", error);
                },
                complete: () => {
                   
                }
            });
    }

    deleteFoodInDiary(id: string, foodId: string, date: string): void {
        this.diaryService
            .deleteFoodInDiary(id, foodId)
            .pipe(take(1))
            .subscribe({
                next: () => {
                   this.getDiaryByDate(date);
                },
                error: (error) => {
                    console.log("Error delating food in diary:", error);
                },
                complete: () => {

                }
            });
    }

    updateFoodInDiary(diaryEntry: FlattenDiaryEntry): void {
        this.diaryService
            .updateFoodInDiary(diaryEntry)
            .subscribe({
                next: () => {
                    this.getDiaryByDate(diaryEntry.date);
                },
                error: (error) => {
                    console.log("Error updating food in diary:", error);
                },
                complete: () => {

                }
            });
    }
}

