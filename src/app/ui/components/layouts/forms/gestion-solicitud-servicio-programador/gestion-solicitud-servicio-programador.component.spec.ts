import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSolicitudServicioProgramadorComponent } from './gestion-solicitud-servicio-programador.component';

describe('GestionSolicitudServicioProgramadorComponent', () => {
  let component: GestionSolicitudServicioProgramadorComponent;
  let fixture: ComponentFixture<GestionSolicitudServicioProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSolicitudServicioProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSolicitudServicioProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
