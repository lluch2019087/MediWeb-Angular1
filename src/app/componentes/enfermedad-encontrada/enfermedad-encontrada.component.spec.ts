import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadEncontradaComponent } from './enfermedad-encontrada.component';

describe('EnfermedadEncontradaComponent', () => {
  let component: EnfermedadEncontradaComponent;
  let fixture: ComponentFixture<EnfermedadEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnfermedadEncontradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermedadEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
