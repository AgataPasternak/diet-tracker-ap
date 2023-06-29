
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Food } from './foods.model';
import { FoodsState } from './foods.state';
;

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})

export class FoodsComponent implements OnInit {
  // ??? --> dlaczego columnsToDisplay nie musi widzieć object Response
  columnsToDisplay = ['id', 'name', 'caloriesPer100g', 'nutriScore', 'actionsColumn'];

  private state = inject(FoodsState);
  private fb = inject(FormBuilder);

  foodForm = this.fb.group({
    // name: ['', [Validators.required, Validators.minLength(20)]],
    name: [''],
    id: [''],
    caloriesPer100g: [''],
    weight: undefined,
    nutriScore: [''],
    tags: [''],
    photo: ['']
  })

  get name() { return this.foodForm.get('name'); }

  searchForm = this.fb.group({
    search: ['']
  })

  response$ = this.state.foods$;
  loading$ = this.state.loading$;
  deleteInProgress$ = this.state.deleteInProgress$;
  postInLoading$ = this.state.postInLoading$;
  errorMessage$ = this.state.errorMessage$;

  ngOnInit(): void {
    this.state.getFoods();

    // this.httpClient.get<Response>(
    //   'http://localhost:8080/api/foods/'
    // ).subscribe((data) => {
    //   this.foods = data;
    // })
  }
  onDeleteFood(id: string) {
    this.state.deleteFoods(id);
  }

  onSubmit() {
    this.state.postFood(this.foodForm.value as Food);
  }
  searchValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.state.searchFood(filterValue);
    if (filterValue === '') {
      this.state.getFoods();
    }
  }
}
