import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './foods.model';

@Injectable({
  providedIn: 'root'
})

export class FoodsService {
  httpClient = inject(HttpClient);

  getFoods(): Observable<Response> {
    return this.httpClient.get<Response>(
      'http://localhost:8080/api/foods/'
    );
  }
}
