import { Injectable } from '@angular/core';
import { DiaryEntry, FlattenDiaryEntry } from './diary.model';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {
    mapDiaryEntryToFlattenDiaryEntry(diary: DiaryEntry): FlattenDiaryEntry {
        const flattenDiary: FlattenDiaryEntry = {
            id: diary.id,
            date: diary.date,
            meal: diary.meal,
            food: diary.food.name,
            weight: diary.weight,
            calories: diary.calories
        };
        return flattenDiary;
    }



}
