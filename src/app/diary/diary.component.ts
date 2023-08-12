import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FoodsState } from '../foods/foods.state';
import { FlattenDiaryEntry } from './diary.model';
import { DiaryState } from './diary.state';



@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit, AfterViewInit {
  startDate = new Date();
  pageTitle: string;
  pageSubtitle: string;
  events: string[] = [];

  noDataTable: string;
  dataSource = new MatTableDataSource<FlattenDiaryEntry>([]);
  columnsToDisplay = ['id', 'meal', 'date', 'food', 'weight', 'actions'];

  route = inject(ActivatedRoute);
  private state = inject(DiaryState);
  private foodsState = inject(FoodsState);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);

  diary$ = this.state.diary$;
  diaryByDate$ = this.state.diaryByDate$;

  ngOnInit(): void {
    this.state.getDiaryEntries();
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.noDataTable = 'Choose date';
    this.foodsState.getFoods();
  }

  ngAfterViewInit(): void {
    this.diaryByDate$.subscribe((data) => {
      const flattenedData = [];
      for (const entry of data.data) {
        for (const food of entry.foods) {
          flattenedData.push({
            id: entry.id,
            date: entry.date,
            foodId: food.id,
            weight: food.weight,
            mealType: food.mealType,
          });
        }
      }
      this.dataSource = new MatTableDataSource<FlattenDiaryEntry>(flattenedData);
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    const chosenDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    if (chosenDate !== null) {
      this.state.getDiaryByDate(chosenDate);
    }
    if (this.dataSource.data.length === 0) {
      this.noDataTable = 'No data for this date';
    }
  }

  formDiaryEntry = this.fb.group({
    date: ['', [Validators.required]]
  })
}


