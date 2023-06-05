
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

type FoodArray = Food[];
type NutriScore = "A" | "B" | "C" | "D" | "E"; 

enum EnNutriScore {
  A = "A",
  B = "B", 
  C = "C"
  // A,
  // B,
  // C
}

const nutriScore: EnNutriScore = EnNutriScore.A;

interface Entity {
  id: string;
}

interface Food extends Entity {
  name: string,
  // id: string,
  caloriesPer100g: number,
  weight: number,
  nutriScore: NutriScore,
  tags: string,
  photo: string
} 

interface Response {
  data: FoodArray,
  length: number
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  response$: Observable<Response>; 

  httpClient = inject(HttpClient);
 
  ngOnInit(): void {
    this.response$ = this.httpClient.get<Response>(
      'http://localhost:8080/api/foods/'
    );

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })
  }
}
