import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnswersAdminComponent } from './list-answers-admin.component';

describe('ListAnswersAdminComponent', () => {
  let component: ListAnswersAdminComponent;
  let fixture: ComponentFixture<ListAnswersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnswersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnswersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
