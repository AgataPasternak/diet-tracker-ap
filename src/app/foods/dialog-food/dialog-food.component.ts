import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map, startWith, take, toArray } from 'rxjs';
import { Food, NutriScore } from '../foods.model';
import { FoodsState } from '../foods.state';
import { TagsState } from '../tags.state';
import { FoodDialogData } from './dialog-food-data.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss'],
})
export class DialogFoodComponent implements OnInit {
  @Input() public inputData: FoodDialogData = inject(MAT_DIALOG_DATA);

  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  private tagsState = inject(TagsState);
  private router = inject(Router);

  readonly postInLoading$ = this.state.postInLoading$;
  private readonly responseFood$ = this.state.food$;
  tags$ = this.tagsState.tags$;

  nutriScoreOptions: NutriScore[] = ['A', 'B', 'C', 'D', 'E'];
  imageSrc: string;

  foodForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    caloriesPer100g: [
      '',
      [Validators.required, Validators.pattern('^[0-9]*$')],
    ],
    weight: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    nutriScore: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    photo: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.inputData.id) {
      this.state.getFoodById(this.inputData.id);
      this.responseFood$.subscribe((data) => {
        this.imageSrc = data.photo;
        this.foodForm.patchValue(data);
      });
    }
    if (this.inputData.readonly) {
      this.foodForm.disable();
    }
    this.tagsState.getTags();
  }

  get name() {
    return this.foodForm.get('name');
  }

  // TODO: refactor, add types to 'tags'
  private convertTagsToString(tags: any): string {
    return Array.isArray(tags) ? tags.join(', ') : tags;
  }

  onSubmit() {
    const formValues = this.foodForm.value;

    const tagsAsString = this.convertTagsToString(formValues.tags);

    const food = {
      ...this.foodForm.value,
      tags: tagsAsString,
    };

    this.state.postFood(food as Food);
    this.closeDialog();
  }

  onUpdate() {
    const formValues = this.foodForm.value;

    const tagsAsString = this.convertTagsToString(formValues.tags);

    const food = {
      ...this.foodForm.value,
      tags: tagsAsString,
      id: this.inputData.id,
    };
    this.state.updateFood(food as Food);
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
