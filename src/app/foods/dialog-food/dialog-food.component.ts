import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Food, NutriScore } from '../foods.model';
import { FoodsState } from '../foods.state';
import { TagsState } from '../tags.state';
import { FoodDialogData } from './dialog-food-data.model';

@Component({
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @Input() public inputData: FoodDialogData = inject(MAT_DIALOG_DATA);

  private ref = inject(MatDialogRef<DialogFoodComponent>);
  private fb = inject(FormBuilder);
  private state = inject(FoodsState);
  private tagsState = inject(TagsState);
  private router = inject(Router);

  readonly postInLoading$ = this.state.postInLoading$;
  private readonly responseFood$ = this.state.food$;
  private readonly tags$ = this.tagsState.tags$;
  tagsArray: any;

  savedTags: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  filteredFruits$: Observable<string[]>;

  nutriScoreOptions: NutriScore[] = ['A', 'B', 'C', 'D', 'E'];
  imageSrc: string;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  foodForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    caloriesPer100g: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    weight: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    nutriScore: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  });
  
  ngOnInit(): void {

    this.tags$.subscribe((data) => {
      this.tagsArray = data.map(tag => tag.name);
    })
    if (this.inputData.id) {
      this.state.getFoodById(this.inputData.id);
      this.responseFood$.subscribe((data) => {
        this.imageSrc = data.photo;
        this.foodForm.patchValue(data);
        this.savedTags = data.tags?.split(',');
      })
    }
    if (this.inputData.readonly) {
      this.foodForm.disable();
    }
    this.tagsState.getTags();

    this.filteredFruits$ = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  

  get name() { return this.foodForm.get('name'); }

  onSubmit() {
    // if (this.foodForm.invalid) {
    //   return;
    // }
    this.state.postFood(this.foodForm.value as Food);
    this.closeDialog();
  }

  onUpdate() { // TODO: przerobić na jedną metodą onSave (onSubmit, onUpdate)
    const food = {
      ...this.foodForm.value, // spread operator
      id: this.inputData.id
    }
    this.state.updateFood(food as Food);
    this.closeDialog();
  }

  remove(tag: string): void {
    const index = this.savedTags.indexOf(tag);
    if (index >= 0) {
      this.savedTags.splice(index, 1);
    }
    const food = {
      ...this.foodForm.value, // spread operator
      id: this.inputData.id,
      tags: this.savedTags.join(',')
    }
    this.state.updateFood(food as Food);
  }

  closeDialog() {
    this.ref.close();
  }
}
