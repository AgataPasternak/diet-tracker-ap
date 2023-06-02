
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Food {
  name: string,
  id: string,
  caloriesPer100g: number,
  weight: number,
  nutriScore: string,
  tags: string,
  photo: string
} 

interface Response {
  // ??? --> dlaczego to działa:
  // data: [],
  data: Food[],
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
  
  // ??? --> dlaczego pole publiczne to nie jest dobra metoda, a lepsze jest asyncPipe?
  // foods: Response;
  response: Observable<Response>; // to pole danych jest strumieniem danych typu

  constructor(private httpClient: HttpClient) {}
  
  ngOnInit(): void {
    this.response = this.httpClient.get<Response>(
      'http://localhost:8080/api/foods/'
    );

    // ??? --> dlaczego nie może być tak?
    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.response = data;
    // })


  }
}
