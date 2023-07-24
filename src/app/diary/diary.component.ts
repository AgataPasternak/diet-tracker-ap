import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    const routerData = this.route.data.subscribe((data) => {
      this.pageTitle = data['title'];
      this.pageSubtitle = data['subtitle'];
    });
    this.fragment = this.route.snapshot.fragment;
  }
}
