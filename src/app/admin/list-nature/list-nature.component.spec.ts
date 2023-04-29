import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNatureComponent } from './list-nature.component';

describe('ListNatureComponent', () => {
  let component: ListNatureComponent;
  let fixture: ComponentFixture<ListNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
