import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TagsResponse } from './tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  readonly API_TAGS = environment.apiUrl + 'dicts/tags/';
  httpClient = inject(HttpClient);

  getTags(): Observable<TagsResponse> {
    return this.httpClient.get<TagsResponse>(this.API_TAGS);
  }
}
