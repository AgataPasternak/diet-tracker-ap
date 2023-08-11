import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiaryState } from './diary.state';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit {
  startDate = new Date();
  pageTitle: string;
  pageSubtitle: string;

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

  formDiaryEntry = this.fb.group({
    date: ['', [Validators.required]]
  })
}


