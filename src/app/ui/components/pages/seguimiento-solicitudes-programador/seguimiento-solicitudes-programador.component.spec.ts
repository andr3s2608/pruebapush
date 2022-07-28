import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSolicitudesProgramadorComponent } from './seguimiento-solicitudes-programador.component';

describe('SeguimientoSolicitudesProgramadorComponent', () => {
  let component: SeguimientoSolicitudesProgramadorComponent;
  let fixture: ComponentFixture<SeguimientoSolicitudesProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSolicitudesProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSolicitudesProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
