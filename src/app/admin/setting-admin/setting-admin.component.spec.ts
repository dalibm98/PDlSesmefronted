import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdminComponent } from './setting-admin.component';

describe('SettingAdminComponent', () => {
  let component: SettingAdminComponent;
  let fixture: ComponentFixture<SettingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
