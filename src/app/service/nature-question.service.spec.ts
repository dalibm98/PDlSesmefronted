import { TestBed } from '@angular/core/testing';

import { NatureQuestionService } from './nature-question.service';

describe('NatureQuestionService', () => {
  let service: NatureQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
