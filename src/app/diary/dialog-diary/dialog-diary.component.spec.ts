import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDiaryComponent } from './dialog-diary.component';

describe('DialogDiaryComponent', () => {
  let component: DialogDiaryComponent;
  let fixture: ComponentFixture<DialogDiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDiaryComponent]
    });
    fixture = TestBed.createComponent(DialogDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
