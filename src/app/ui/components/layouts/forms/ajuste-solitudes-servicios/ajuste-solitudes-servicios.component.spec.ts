import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteSolitudesServiciosComponent } from './ajuste-solitudes-servicios.component';

describe('AjusteSolitudesServiciosComponent', () => {
  let component: AjusteSolitudesServiciosComponent;
  let fixture: ComponentFixture<AjusteSolitudesServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteSolitudesServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteSolitudesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
