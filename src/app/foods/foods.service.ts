import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../shared/models/api-response.model';
import { Food } from './foods.model';

@Injectable({
  providedIn: 'root'
})

export class FoodsService {
  private readonly API_FOODS = environment.apiUrl + 'foods/';
  httpClient = inject(HttpClient);

  getFoods(): Observable<ApiResponse<Food>> {
    return this.httpClient.get<ApiResponse<Food>>(this.API_FOODS);
  }

  getFoodsById(id: string): Observable<Food> {
    return this.httpClient.get<Food>(this.API_FOODS + id);
  }

  deleteFoods(id: string): Observable<void> { // back-end nie intersuje jakiego typu dane zwracamy
    return this.httpClient.delete<void>(this.API_FOODS + id);
  }

  postFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(this.API_FOODS, food);
  }

  searchFood(filterValue: string): Observable<ApiResponse<Food>> {
    return this.httpClient.get<ApiResponse<Food>>(this.API_FOODS + 'search/?name=' + filterValue);
  }

  updateFood(food: Food): Observable<Food> {
    return this.httpClient.put<Food>(this.API_FOODS + food.id, food);
  }
}
