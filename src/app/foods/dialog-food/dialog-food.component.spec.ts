import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { DialogFoodComponent } from './dialog-food.component';

describe('DialogFoodComponent', () => {
  let component: DialogFoodComponent;
  let fixture: ComponentFixture<DialogFoodComponent>;

  beforeEach(() => {
    if (component === undefined) {
      console.log("MyComponent is undefined!");
    }
    TestBed.configureTestingModule({
      imports: [MAT_DIALOG_DATA, MatDialogModule, RouterTestingModule],
      // imports: [MAT_DIALOG_DATA, MatSnackBarModule, MatDialogModule, RouterTestingModule, MatPaginatorModule, NoopAnimationsModule],
      declarations: [DialogFoodComponent]
    });
    fixture = TestBed.createComponent(DialogFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
