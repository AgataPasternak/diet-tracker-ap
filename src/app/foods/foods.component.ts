
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodsService } from './foods.service';
import { Response } from './foods.model';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g'];
  response$: Observable<Response>; 
  private foodService = inject(FoodsService);
  
  ngOnInit(): void {
    this.response$ = this.foodService.getFoods();

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })
  }
}
