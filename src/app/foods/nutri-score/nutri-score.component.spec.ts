import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriScoreComponent } from './nutri-score.component';

describe('NutriScoreComponent', () => {
  let component: NutriScoreComponent;
  let fixture: ComponentFixture<NutriScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutriScoreComponent]
    });
    fixture = TestBed.createComponent(NutriScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
