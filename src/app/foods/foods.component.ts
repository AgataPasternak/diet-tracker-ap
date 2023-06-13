
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePageEvent } from '@angular/material/table';

type FoodArray = Food[];
type NutriScore = "A" | "B" | "C" | "D" | "E"; 

enum EnNutriScore {
  A = "A",
  B = "B", 
  C = "C"
}

const nutriScore: EnNutriScore = EnNutriScore.A;

interface Entity {
  id: string;
}

interface Food extends Entity {
  name: string,
  caloriesPer100g: number,
  weight: number,
  nutriScore: NutriScore,
  tags: string,
  photo: string
} 

export interface Test {
  name: string,
  weight: number,
  nutriScore: NutriScore
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

  foods: any;
  httpClient = inject(HttpClient);
  displayColumn: string[] = ['name', 'weight', 'nutriScore'];
  dataSource!: MatTableDataSource<Response>;
  @ViewChild(MatSort) sort!: MatSort;

 
  ngOnInit(): void {
    this.httpClient.get<Response>(
      'http://localhost:8080/api/foods/'
    ).subscribe((data) => {
      this.foods = data.data;
      this.dataSource = new MatTableDataSource(this.foods);
      this.dataSource.sort = this.sort;  
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
