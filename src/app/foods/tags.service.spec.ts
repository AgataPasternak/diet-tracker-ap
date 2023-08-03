import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TagsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tags', fakeAsync(() => {
    const dummyTags = {
      data: [
        {
          id: 'tag1',
          name: 'tag1',
        },
        {
          id: 'tag2',
          name: 'tag2',
        },
      ],
      length: 2,
    };

    service.getTags().subscribe((tags) => {
      expect(tags.length).toBe(2);
      expect(tags).toEqual(dummyTags);
    });

    const req = httpMock.expectOne(service.API_TAGS);
    // console.log('req', req);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTags);
  }
  ));

});
