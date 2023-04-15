import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountusersComponent } from './accountusers.component';

describe('AccountusersComponent', () => {
  let component: AccountusersComponent;
  let fixture: ComponentFixture<AccountusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
