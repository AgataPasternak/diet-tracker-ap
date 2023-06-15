
import { Component, OnInit, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Foods } from './foods.model';
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
  private fb = inject(FormBuilder);

  foodForm = this.fb.group({
    name: [''],
    id: [''],
    caloriesPer100g: [''],
    weight: undefined,
    nutriScore: [''],
    tags: [''],
    photo: ['']
  })

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;

  ngOnInit(): void {
    this.state.getFoods();
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
    // const food: Foods = this.mapFormToFood()
    this.state.postFood(this.foodForm.value as Foods);
  }
}
