import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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

  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['id', 'meal', 'date', 'food', 'weight', 'actions'];

  route = inject(ActivatedRoute);
  private state = inject(DiaryState);
  private fb = inject(FormBuilder);

  diary$ = this.state.diary$;

  ngOnInit(): void {
    this.state.getDiaryEntries();
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
  }

  ngAfterViewInit(): void {
    this.diary$.subscribe((data) => {
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
      this.dataSource = new MatTableDataSource(flattenedData);
    });
  }

  formDiaryEntry = this.fb.group({
    date: ['', [Validators.required]]
  })
}


