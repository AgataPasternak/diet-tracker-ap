import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBuilder } from 'ng-mocks';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressBarModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: {} } as ActivatedRouteSnapshot,
            parent: { snapshot: { data: {} } } as ActivatedRoute,
          },
        },
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return MockBuilder()
      .keep(HttpClientTestingModule)
      .keep(MatSnackBarModule)
      .keep(MatDialogModule)
      .mock(MatTableModule)
      .mock(MatProgressBarModule)
      .mock(ReactiveFormsModule)
      .mock(MatIconModule)
      .mock(MatDividerModule)
      .mock(MatFormFieldModule);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
