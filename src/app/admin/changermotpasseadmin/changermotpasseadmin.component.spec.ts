import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangermotpasseadminComponent } from './changermotpasseadmin.component';

describe('ChangermotpasseadminComponent', () => {
  let component: ChangermotpasseadminComponent;
  let fixture: ComponentFixture<ChangermotpasseadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangermotpasseadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangermotpasseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
