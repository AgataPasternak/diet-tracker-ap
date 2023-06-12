
import { Component, OnInit, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './foods.model';
import { FoodsState } from './foods.state';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'actionsColumn'];

  private state = inject(FoodsState);
  // httpClient = inject(HttpClient);
  // private readonly API_FOODS = 'http://localhost:8080/api/foods/';
  response$: Observable<Response> = this.state.foods$; 
  
  
  ngOnInit(): void {
    this.state.getFoods();
    // ??? ==> dlaczego nie da się tak
    // this.response$ = this.foodState.getFoods().foods$;

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })
  }
  onDeleteFood(id: string) {
     this.state.deleteFoods(id);
  }


  
}
