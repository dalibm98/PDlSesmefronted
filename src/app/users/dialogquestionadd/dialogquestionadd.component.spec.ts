import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogquestionaddComponent } from './dialogquestionadd.component';

describe('DialogquestionaddComponent', () => {
  let component: DialogquestionaddComponent;
  let fixture: ComponentFixture<DialogquestionaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogquestionaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogquestionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
