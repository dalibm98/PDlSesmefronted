import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedesusersComponent } from './listedesusers.component';

describe('ListedesusersComponent', () => {
  let component: ListedesusersComponent;
  let fixture: ComponentFixture<ListedesusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedesusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
