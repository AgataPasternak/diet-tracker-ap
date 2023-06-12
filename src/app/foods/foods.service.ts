import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './foods.model';

@Injectable({
  providedIn: 'root'
})

export class FoodsService {
  private readonly API_FOODS = 'http://localhost:8080/api/foods/';
  httpClient = inject(HttpClient);

  getFoods(): Observable<Response> {
    return this.httpClient.get<Response>(this.API_FOODS);
  }

  deleteFoods(id: string) {
    this.httpClient.delete(this.API_FOODS + id).subscribe();
  }
}
