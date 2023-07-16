import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from '../foods.model';
import { FoodsState } from '../foods.state';

@Component({
  selector: 'app-dialog-food',
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {
  inputData: any;

  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  public data: any = inject(MAT_DIALOG_DATA);
  postInLoading$ = this.state.postInLoading$;
  responseFood$ = this.state.food$;

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id) {
      this.state.getFoodById(this.inputData.id);
      this.responseFood$.subscribe((data) => {
        this.foodForm.patchValue(data);
      })
    }
  }

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

  // searchForm = this.fb.group({
  //   search: ['']
  // })

  onSubmit() {
    this.state.postFood(this.foodForm.value as Food);
    this.closeDialog();
  }

  onUpdate() {
    this.state.updateFood(this.foodForm.value as Food);
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
