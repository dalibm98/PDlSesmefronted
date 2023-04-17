import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpostComponent } from './modifpost.component';

describe('ModifpostComponent', () => {
  let component: ModifpostComponent;
  let fixture: ComponentFixture<ModifpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
