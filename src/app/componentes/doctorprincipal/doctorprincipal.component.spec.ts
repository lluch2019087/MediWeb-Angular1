import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorprincipalComponent } from './doctorprincipal.component';

describe('DoctorprincipalComponent', () => {
  let component: DoctorprincipalComponent;
  let fixture: ComponentFixture<DoctorprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
