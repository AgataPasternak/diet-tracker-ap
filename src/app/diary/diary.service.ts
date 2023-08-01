import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiaryResponse } from './diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private readonly API_DIARY = environment.apiUrl + 'diary/';
  httpClient = inject(HttpClient);

  getDiaryEntries(): Observable<DiaryResponse> {
    return this.httpClient.get<DiaryResponse>(this.API_DIARY);
  }
}
