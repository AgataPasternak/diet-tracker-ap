
import { Component, OnInit, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foods, Response } from './foods.model';
import { FoodsState } from './foods.state';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'actionsColumn'];

  
  private state = inject(FoodsState);
  private fb = inject(FormBuilder);

  foodForm = this.fb.group({
    name: ['Cottage cheese'],
    id: ['1'],
    caloriesPer100g: ['100'],
    weight: [12],
    nutriScore: ['A'],
    tags: ['1'],
    photo: ['1']
  })

  response$: Observable<Response> = this.state.foods$; 
  
  // foodForm: FormGroup;
  
  ngOnInit(): void {
    this.state.getFoods();
    // ??? ==> dlaczego nie da się tak
    // this.response$ = this.foodState.getFoods().foods$;

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })

    // this.foodForm = new FormGroup({
	  //     'name': new FormControl('Cottage cheese'),
	  //     'id': new FormControl('1'),
	  //     'caloriesPer100g': new FormControl('32'),
	  //     'weight': new FormControl('100'),
	  //     'nutriScore': new FormControl('A'),
	  //     'tags': new FormControl('1')
	  // });
  }
  onDeleteFood(id: string) {
     this.state.deleteFoods(id);
  }
  
  onSubmit() {
    console.log();
    const food: Foods = this.MapFormToFood()
    this.state.postFoods(food);
  }

  private MapFormToFood(): Foods {
    return {
      // ??? --> jak konkretnie działa wykrzyknik na końcu
      name: this.foodForm.value.name!,

      // żeby zadziałoło musiałam w modelu zmienć typ z Entity na string
      id: this.foodForm.value.id!,
      caloriesPer100g: this.foodForm.value.caloriesPer100g!,
      weight: this.foodForm.value.weight!,

      // żeby zadziałoło musiałam w modelu zmienć typ z NutriScore na string
      nutriScore: this.foodForm.value.nutriScore!,
      tags: this.foodForm.value.tags!,
      photo: this.foodForm.value.photo!
    };
  }
}
