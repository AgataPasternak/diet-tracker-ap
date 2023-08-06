import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FoodsState } from '../foods/foods.state';
import { DialogDiaryComponent } from './dialog-diary/dialog-diary.component';
import { MealType } from './diary.model';
import { DiaryState } from './diary.state';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit {

  route = inject(ActivatedRoute);
  // dlaczego musi być null?
  fragment: string | null = '';
  pageTitle: string;
  pageSubtitle: string;

  mealTypes: MealType[] = ['breakfast', 'secondBreakfast', 'lunch', 'afternoonTea', 'dinner'];

  private state = inject(DiaryState);
  private fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  stateFood = inject(FoodsState);

  diary$ = this.state.diary$;

  responseFoods$ = this.stateFood.foods$;
  // responseFoods$: Observable<any>;

  ngOnInit(): void {
    this.state.getDiaryEntries();
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.fragment = this.route.snapshot.fragment;

    this.stateFood.getFoods();
    // this.responseFoods$ = this.stateFood.foods$;

  }

  diaryForm = this.fb.group({
    date: ['', [Validators.required]],
    mealTypes: ['', [Validators.required]],
    foodInDiary: ['', [Validators.required]],
    weight: ['', [Validators.required]],

  });

  openDialog() {
    this.dialog.open(DialogDiaryComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }


}
