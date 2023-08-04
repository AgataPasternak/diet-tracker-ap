import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { FoodsComponent } from './foods.component';

describe('FoodsComponent', () => {
  beforeEach(() => {
    return MockBuilder()
      .keep(FoodsComponent)
      .keep(HttpClientTestingModule)
      .keep(MatSnackBarModule)
      .keep(MatDialogModule)
      .mock(ActivatedRoute, {
        data: of({})
      })
      .mock(MatTableModule)
      .mock(MatPaginatorModule)
      .mock(MatProgressBarModule)
      .mock(ReactiveFormsModule)
      .mock(MatIconModule)
      .mock(MatDividerModule)
      .mock(MatFormFieldModule)
  });

  it('should create', () => {
    const fixture = MockRender(FoodsComponent);
    expect(fixture).toBeTruthy();
  });

  it('has isReadOnly value', () => {
    MockRender(FoodsComponent, {
      isReadOnly: false
    });

    const isReadOnlyEl = ngMocks.find('.isReadOnly');
    expect(isReadOnlyEl.nativeElement.textContent).toBe('false');
    // dlaczego toBeTruthy() nie zawraca błędu?
    expect(isReadOnlyEl).toBeTruthy();
  });

});


