import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map, startWith, toArray } from 'rxjs';
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
  private readonly tags$ = this.tagsState.tags$;
  tagsArray: string[] = [];

  savedTags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  choosenTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

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
    tags: [''],
    photo: ['', [Validators.required]],
  });

  // mat chip START
  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.tagsArray.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.choosenTags.push(value);
      this.foodForm.get('tags')?.setValue(this.choosenTags.join(','));
    }

    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.choosenTags.indexOf(tag);

    if (index >= 0) {
      this.choosenTags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
      this.foodForm.get('tags')?.setValue(this.choosenTags.join(','));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.choosenTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.foodForm.get('tags')?.setValue(this.choosenTags.join(', '));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsArray.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  // mat chip END

  ngOnInit(): void {
    this.tags$.subscribe((data) => {
      this.tagsArray = data.map((tag) => tag.name);
    });
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

  onSubmit() {
    // if (this.foodForm.invalid) {
    //   return;
    // }
    this.state.postFood(this.foodForm.value as Food);
    this.closeDialog();
  }

  onUpdate() {
    // TODO: przerobić na jedną metodą onSave (onSubmit, onUpdate)
    const food = {
      ...this.foodForm.value, // spread operator
      id: this.inputData.id,
    };
    this.state.updateFood(food as Food);
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
