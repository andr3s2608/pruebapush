import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSolicitudesConductorComponent } from './seguimiento-solicitudes-conductor.component';

describe('SeguimientoSolicitudesConductorComponent', () => {
  let component: SeguimientoSolicitudesConductorComponent;
  let fixture: ComponentFixture<SeguimientoSolicitudesConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSolicitudesConductorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSolicitudesConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
