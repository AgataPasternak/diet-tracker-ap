import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FoodsState } from 'src/app/foods/foods.state';

@Component({
  selector: 'app-dialog-diary',
  templateUrl: './dialog-diary.component.html',
  styleUrls: ['./dialog-diary.component.scss']
})
export class DialogDiaryComponent implements OnInit {

  @Input() formGroupName!: string;
  form!: FormGroup;

  stateFood = inject(FoodsState);
  rootFormGroup = inject(FormGroupDirective);
  responseFoods$ = this.stateFood.foods$;

  ngOnInit(): void {
    this.stateFood.getFoods();
    this.form = this.rootFormGroup.control.get('foodInDiary') as FormGroup;
  }
}
