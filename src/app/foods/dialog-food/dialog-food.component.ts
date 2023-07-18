import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food, NutriScore } from '../foods.model';
import { FoodsState } from '../foods.state';
import { TagsState } from '../tags.state';
import { Dialog } from './dialog.model';

@Component({
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {
  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  inputData: Dialog = inject(MAT_DIALOG_DATA);
  tagsState = inject(TagsState);

  postInLoading$ = this.state.postInLoading$;
  responseFood$ = this.state.food$;
  tags$ = this.tagsState.tags$;

  nutriScoreOptions: NutriScore[] = ['A', 'B', 'C', 'D', 'E'];


  ngOnInit(): void {
    if (this.inputData.id) {
      this.state.getFoodById(this.inputData.id);
      this.responseFood$.subscribe((data) => {
        this.foodForm.patchValue(data);
      })
    }
    if (this.inputData.readonly) {
      this.foodForm.disable();
    }
    this.tagsState.getTags();
  }

  foodForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    caloriesPer100g: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    weight: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    nutriScore: ['', [Validators.required]],
    tags: ['1', [Validators.required]],
    photo: ['', [Validators.required]]
  })

  get name() { return this.foodForm.get('name'); }

  onSubmit() {
    this.state.postFood(this.foodForm.value as Food);
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
