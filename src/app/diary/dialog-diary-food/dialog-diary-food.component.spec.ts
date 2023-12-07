import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDiaryFoodComponent } from './dialog-diary-food.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('DialogDiaryFoodComponent', () => {
  beforeEach(() => {
    return MockBuilder()
      .keep(DialogDiaryFoodComponent)
      .keep(HttpClientTestingModule)
      .keep(MatSnackBarModule)
      .keep(MatDialogModule)
      .keep(ReactiveFormsModule)
      .keep(MatAutocompleteModule)
      .mock(MAT_DIALOG_DATA)
      .mock(MatDialogRef)
      .mock(MatFormFieldModule)
      .mock(MatInputModule)
      .mock(MatChipsModule)
      .mock(MatIconModule)
      .mock(MatSelectModule);
  });

  it('should create', () => {
    const fixture = MockRender(DialogDiaryFoodComponent, {
      inputData: {
        id: 1,
      },
    });
    expect(fixture).toBeTruthy();
  });
});
