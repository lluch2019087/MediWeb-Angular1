import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamedicamentosComponent } from './listamedicamentos.component';

describe('ListamedicamentosComponent', () => {
  let component: ListamedicamentosComponent;
  let fixture: ComponentFixture<ListamedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListamedicamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListamedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
