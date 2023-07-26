import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Food, NutriScore } from '../foods.model';
import { FoodsState } from '../foods.state';
import { TagsState } from '../tags.state';
import { FoodDialogData } from './dialog-food-data.model';

@Component({
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {
  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  inputData: FoodDialogData = inject(MAT_DIALOG_DATA);
  tagsState = inject(TagsState);
  router = inject(Router);

  savedTags: string[] = [];

  postInLoading$ = this.state.postInLoading$;
  responseFood$ = this.state.food$;
  tags$ = this.tagsState.tags$;
  tagsArray: any;


  nutriScoreOptions: NutriScore[] = ['A', 'B', 'C', 'D', 'E'];
  imageSrc: string;

  ngOnInit(): void {

    this.tags$.subscribe((data) => {
      this.tagsArray = data.map(tag => tag.name);
    })
    if (this.inputData.id) {
      this.state.getFoodById(this.inputData.id);
      this.responseFood$.subscribe((data) => {
        this.imageSrc = data.photo;
        this.foodForm.patchValue(data);
        this.savedTags = data.tags?.split(',');
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
    tags: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  })

  get name() { return this.foodForm.get('name'); }

  onSubmit() {
    // if (this.foodForm.invalid) {
    //   return;
    // }
    this.state.postFood(this.foodForm.value as Food);
    // const name = this.foodForm.get('name')?.value;
    this.closeDialog();
  }

  onUpdate() { // TODO: przerobić na jedną metodą onSave (onSubmit, onUpdate)
    // if (this.foodForm.invalid) {
    //   return;
    // }
    const food = {
      ...this.foodForm.value, // spread operator
      id: this.inputData.id
    }
    this.state.updateFood(food as Food);
    this.closeDialog();
  }

  remove(tag: string): void {
    const index = this.savedTags.indexOf(tag);
    if (index >= 0) {
      this.savedTags.splice(index, 1);
    }
    const food = {
      ...this.foodForm.value, // spread operator
      id: this.inputData.id,
      tags: this.savedTags.join(',')
    }
    this.state.updateFood(food as Food);
  }

  closeDialog() {
    this.ref.close();
  }
}
