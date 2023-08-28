import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Food } from '../foods/foods.model';
import { FoodsState } from '../foods/foods.state';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry, FlattenDiaryEntry, MealType } from './diary.model';
import { DiaryState } from './diary.state';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit, AfterViewInit, OnDestroy {

  pageTitle: string;
  pageSubtitle: string;
  events: string[] = [];

  noDataTable: string;
  dataSource = new MatTableDataSource<FlattenDiaryEntry>([]);
  mealType: MealType[] = ['breakfast', 'lunch', 'dinner'];
  columnsToDisplay = ['id', 'meal', 'date', 'food', 'weight', 'calories', 'actions'];

  route = inject(ActivatedRoute);
  private state = inject(DiaryState);
  private foodsState = inject(FoodsState);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);

  diary$ = this.state.diary$;
  diaryByDate$ = this.state.diaryByDate$;
  foods$ = this.foodsState.foods$;
  readonly diaryLength$ = this.state.diaryLength$;

  startDate = new Date();
  startDateTransformed = this.datePipe.transform(this.startDate, "yyyy-MM-dd");

  ngOnInit(): void {
    this.state.getDiaryEntries();
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.foodsState.getFoods();
    const today = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    // ??  nie działa jak powinno - pierwsza próba zmiany daty przekazuje w evencie stary obiekt (today's diary)
    if (today !== null) {
      this.state.getDiaryByDate(today);
    }
  }

  ngAfterViewInit(): void {
    this.diaryByDate$.subscribe((data) => {
      const flattenedData: FlattenDiaryEntry[] = [];
      for (const entry of data.data) {
        for (const food of entry.foods) {
          const foodInfo = this.foodsState.foods$.pipe(
            map((response: ApiResponse<Food>) => response.data.find((f) => f.id === food.id))
          );

          foodInfo.subscribe((foodDetails) => {
            if (foodDetails) {
              const caloriesPer100g = foodDetails.caloriesPer100g;
              const caloriesConsumed = (food.weight / 100) * +caloriesPer100g;

              flattenedData.push({
                id: entry.id,
                date: entry.date,
                foodId: food.id,
                weight: food.weight,
                mealType: food.mealType,
                calories: caloriesConsumed.toFixed(2),
              });
            }
          });
        }
      }
      this.dataSource.data = flattenedData;
    });
  }

  getTotalCalories() {
    return this.dataSource.data.map(data => + data.calories).reduce((acc, value) => acc + value, 0);
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const chosenDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    if (chosenDate != null) {
      this.state.getDiaryByDate(chosenDate);
    }
  }

  formDiaryEntry = this.fb.group({
    date: [this.startDateTransformed, [Validators.required]],
    food: this.fb.group({
      id: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      mealType: ['', [Validators.required]]
    })
  });

  onSubmit() {
    if (this.formDiaryEntry.invalid) {
      return;
    }
    const formattedDate = this.datePipe.transform(this.formDiaryEntry.value.date, "yyyy-MM-dd");
    const formattedId = this.formDiaryEntry.value.food?.id;
    const formattedIdString = String(formattedId);
    this.formDiaryEntry.patchValue({
      date: formattedDate,
      food: {
        id: formattedIdString
      }
    });
    this.state.postDiaryItem(this.formDiaryEntry.value as DiaryEntry);
    this.formDiaryEntry.get('food')?.reset();
    // nie pobiera danych z dziennika po dodaniu nowego wpisu, bo nie widzi jeszcze nowego wpisu
    this.state.getDiaryByDate(formattedDate as string);
  }

  onDeleteFoodinDairy(id: string, foodId: string): void {
    this.state.deleteFoodInDiary(id, foodId);
  }

  onDeleteDiaryEntry(id: string | undefined): void {
    if (id !== undefined) {
      this.state.deleteDiaryEntry(id);
    } else {
      console.error("Invalid ID: Cannot delete entry with undefined ID.");
    }
  }

  ngOnDestroy(): void {

  }
}


