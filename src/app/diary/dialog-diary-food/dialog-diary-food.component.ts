import { Component, Input, OnInit, inject } from '@angular/core';
import { MealType } from '../diary.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiaryState } from '../diary.state';

@Component({
  templateUrl: './dialog-diary-food.component.html',
  styleUrls: ['./dialog-diary-food.component.scss'],
})
export class DialogDiaryFoodComponent implements OnInit {
  mealType: MealType[] = ['breakfast', 'lunch', 'dinner'];

  private state = inject(DiaryState);

  readonly diaryByDate$ = this.state.diaryByDate$;

  readonly inputData = inject(MAT_DIALOG_DATA);

  private ref = inject(MatDialogRef<DialogDiaryFoodComponent>);
  private fb = inject(FormBuilder);

  diaryForm: FormGroup;

  ngOnInit(): void {
    const { date, name, weight, mealType } = this.inputData;
    console.log(name);
    this.diaryForm = this.fb.group({
      date: [date, [Validators.required]],
      name: [name, [Validators.required]],
      weight: [weight, [Validators.required, Validators.pattern('^[0-9]*$')]],
      mealType: [mealType, [Validators.required]],
    });
  }

  onEditDiary(): void {}

  closeDialog() {
    this.ref.close();
  }
}
