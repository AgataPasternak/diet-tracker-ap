import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from '../foods.model';
import { FoodsState } from '../foods.state';
import { TagsState } from '../tags.state';

@Component({
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {
  inputData: any; // zrobić interfejs; usunąć i używać samej data

  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  public data: any = inject(MAT_DIALOG_DATA); // zrobić interfejs
  public tagsState = inject(TagsState);

  postInLoading$ = this.state.postInLoading$;
  responseFood$ = this.state.food$;
  tags$ = this.tagsState.tags$;

  ngOnInit(): void {
    this.inputData = this.data;
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
    nutriScore: ['', [Validators.required, Validators.pattern('^[A-E]$'), Validators.minLength(1), Validators.maxLength(1)]],
    tags: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  })

  get name() { return this.foodForm.get('name'); }

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
