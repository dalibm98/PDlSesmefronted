import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostAdminComponent } from './list-post-admin.component';

describe('ListPostAdminComponent', () => {
  let component: ListPostAdminComponent;
  let fixture: ComponentFixture<ListPostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
