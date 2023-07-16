import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    caloriesPer100g: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    weight: undefined,
    nutriScore: ['', [Validators.required, Validators.pattern('^[A-E]$'), Validators.minLength(1), Validators.maxLength(1)]],
    tags: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  })

  get name() { return this.foodForm.get('name'); }

  // searchForm = this.fb.group({
  //   search: ['']
  // })

  onSubmit() {
    this.state.postFood(this.foodForm.value as Food);
    console.log(this.foodForm);

    // this.closeDialog();
  }

  onUpdate() {
    this.state.updateFood(this.foodForm.value as Food);
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
