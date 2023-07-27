import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private readonly API_DIARY = environment.apiUrl + 'diary/';
  httpClient = inject(HttpClient);
}
