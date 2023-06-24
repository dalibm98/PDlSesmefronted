import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangermotpasseuserComponent } from './changermotpasseuser.component';

describe('ChangermotpasseuserComponent', () => {
  let component: ChangermotpasseuserComponent;
  let fixture: ComponentFixture<ChangermotpasseuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangermotpasseuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangermotpasseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
