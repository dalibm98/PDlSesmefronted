import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcommentComponent } from './dialogcomment.component';

describe('DialogcommentComponent', () => {
  let component: DialogcommentComponent;
  let fixture: ComponentFixture<DialogcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
