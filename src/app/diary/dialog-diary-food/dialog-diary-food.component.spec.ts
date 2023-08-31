import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDiaryFoodComponent } from './dialog-diary-food.component';

describe('DialogDiaryFoodComponent', () => {
  let component: DialogDiaryFoodComponent;
  let fixture: ComponentFixture<DialogDiaryFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDiaryFoodComponent]
    });
    fixture = TestBed.createComponent(DialogDiaryFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
