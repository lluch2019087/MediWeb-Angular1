import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariospdfComponent } from './usuariospdf.component';

describe('UsuariospdfComponent', () => {
  let component: UsuariospdfComponent;
  let fixture: ComponentFixture<UsuariospdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariospdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariospdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
