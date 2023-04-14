import { TestBed } from '@angular/core/testing';

import { DomaineQuestionService } from './domaine-question.service';

describe('DomaineQuestionService', () => {
  let service: DomaineQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomaineQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
