
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Food {
  data: [
    {
      name: string,
      id: string,
      caloriesPer100g: number,
      weight: number,
      nutriScore: string,
      tags: string,
      photo: string
    }
  ],
  lenght: number
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  // ??? --> dlaczego nie możemy tego od razu inicjalizować?
  // foods: Food[] = [];
  foods: Food;

  constructor(private httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this.httpClient.get<Food>('http://localhost:8080/api/foods/')
    .subscribe((data) => {
      this.foods = data;
      console.log(this.foods);
    })
  }
}
