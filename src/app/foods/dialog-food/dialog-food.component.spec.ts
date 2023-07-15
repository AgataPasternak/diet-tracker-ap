import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFoodComponent } from './dialog-food.component';

describe('DialogFoodComponent', () => {
  let component: DialogFoodComponent;
  let fixture: ComponentFixture<DialogFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
