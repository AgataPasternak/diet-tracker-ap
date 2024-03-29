import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FoodsService } from './foods.service';

describe('FoodsService', () => {
  let service: FoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
