import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MealType } from './diary.model';
import { DiaryState } from './diary.state';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
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

  diary$ = this.state.diary$;

  ngOnInit(): void {
    this.state.getDiaryEntries();
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.fragment = this.route.snapshot.fragment;

  }

  diaryForm = this.fb.group({
    date: ['', [Validators.required]],
    mealTypes: ['', [Validators.required]],
  });



}
