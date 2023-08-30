import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry, FlattenDiaryEntry } from './diary.model';

@Injectable({
    providedIn: 'root'
})
export class DiaryFacadeService {
    mapDiaryEntryToFlattenDiaryEntry(diary: Observable<ApiResponse<DiaryEntry>>): FlattenDiaryEntry[] {
        return diary.pipe(
            map((data) => {
                const flattenDiary: FlattenDiaryEntry[] = [];


                const flattenDiary: FlattenDiaryEntry[] = [{
                    id: '122',
                    date: '2023-09-09',
                    foodId: '2',
                    weight: 123,
                    mealType: 'dinner',
                    calories: '12'
                }];
                return flattenDiary;
            }



}
