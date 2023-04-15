import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQuestionComponent } from './liste-question.component';

describe('ListeQuestionComponent', () => {
  let component: ListeQuestionComponent;
  let fixture: ComponentFixture<ListeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
