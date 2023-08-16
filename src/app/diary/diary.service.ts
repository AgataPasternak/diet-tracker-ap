import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry } from './diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private readonly API_DIARY = environment.apiUrl + 'diary/';
  httpClient = inject(HttpClient);

  getDiaryEntries(): Observable<ApiResponse<DiaryEntry>> {
    return this.httpClient.get<ApiResponse<DiaryEntry>>(this.API_DIARY);
  }

  getDiaryByDate(date: string): Observable<ApiResponse<DiaryEntry>> {
    return this.httpClient.get<ApiResponse<DiaryEntry>>(this.API_DIARY + '?date=' + date);
  }

  postDiary(diary: DiaryEntry): Observable<DiaryEntry> {
    return this.httpClient.post<DiaryEntry>(this.API_DIARY, diary);
  }

}
