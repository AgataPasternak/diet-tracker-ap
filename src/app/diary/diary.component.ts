import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Food } from '../foods/foods.model';
import { FoodsState } from '../foods/foods.state';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryFacadeService } from './diary.facade';
import { DiaryEntry, FlattenDiaryEntry, MealType } from './diary.model';
import { DiaryState } from './diary.state';
import { MatDialog } from '@angular/material/dialog';
import { DialogDiaryFoodComponent } from './dialog-diary-food/dialog-diary-food.component';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit {
  pageTitle: string;
  pageSubtitle: string;
  events: string[] = [];
  noDataTable: string;
  dataSource = new MatTableDataSource<FlattenDiaryEntry>([]);
  mealType: MealType[] = ['breakfast', 'lunch', 'dinner'];
  columnsToDisplay = [
    'id',
    'meal',
    'date',
    'food',
    'weight',
    'calories',
    'actions',
  ];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private state = inject(DiaryState);
  private foodsState = inject(FoodsState);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  private diaryFacade = inject(DiaryFacadeService);
  private dialog = inject(MatDialog);
  readonly DATE_FORMAT = 'yyyy-MM-dd';

  readonly diaryByDate$ = this.state.diaryByDate$;
  readonly foods$ = this.foodsState.foods$;
  readonly diaryLength$ = this.state.diaryLength$;

  startDate = new Date();
  startDateTransformed = this.datePipe.transform(
    this.startDate,
    this.DATE_FORMAT
  );

  formDiaryEntry = this.fb.group({
    date: [this.startDateTransformed, [Validators.required]],
    food: this.fb.group({
      id: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      mealType: ['', [Validators.required]],
    }),
  });

  ngOnInit(): void {
    this.state.getDiaryEntries();
    this.getTitles();
    this.foodsState.getFoods();
    this.getDateFromQueryParams();
    this.calculateCalories();
  }

  private calculateCalories() {
    this.foods$
      .pipe(
        switchMap((dataFoods: ApiResponse<Food>) =>
          this.diaryByDate$.pipe(
            map((response: ApiResponse<DiaryEntry>) => {
              return this.diaryFacade.flattenData(response, dataFoods);
            }),
            tap((data: FlattenDiaryEntry[]) => {
              this.dataSource.data = data;
            })
          )
        )
      )
      .subscribe();
  }

  private getDateFromQueryParams() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const date = params['date'];
      if (date != undefined) {
        this.state.getDiaryByDate(date);
        this.formDiaryEntry.patchValue({
          date: date,
        });
      } else {
        const today = this.datePipe.transform(this.startDate, this.DATE_FORMAT);
        if (today !== null) {
          this.state.getDiaryByDate(today);
        }
      }
    });
  }

  get food(): FormControl {
    return this.formDiaryEntry.get('food') as FormControl;
  }

  private getTitles() {
    this.activatedRoute.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
  }

  getTotalCalories() {
    return this.dataSource.data
      .map((data) => +data.calories)
      .reduce((acc, value) => acc + value, 0);
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const chosenDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

    if (chosenDate != undefined) {
      this.state.getDiaryByDate(chosenDate);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { date: chosenDate },
        queryParamsHandling: 'merge',
      });
    }
  }

  onSubmit() {
    if (this.formDiaryEntry.invalid) {
      return;
    }
    const formattedDate = this.datePipe.transform(
      this.formDiaryEntry.value.date,
      this.DATE_FORMAT
    );
    const formattedId = this.food.value.id;
    const formattedIdString = String(formattedId);
    this.formDiaryEntry.patchValue({
      date: formattedDate,
      food: {
        id: formattedIdString,
      },
    });
    this.state.postDiaryItem(this.formDiaryEntry.value as DiaryEntry);
    this.food.reset();
  }

  onDeleteFoodInDairy(id: string, foodId: string, date: string): void {
    this.state.deleteFoodInDiary(id, foodId, date);
  }

  onDeleteDiaryEntry(id: string | undefined): void {
    if (id != undefined) {
      this.state.deleteDiaryEntry(id);
    }
  }

  onOpenDialog(data: FlattenDiaryEntry): void {
    this.dialog.open(DialogDiaryFoodComponent, {
      width: '40%',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data,
    });
  }
}
