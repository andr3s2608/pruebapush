import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSolicitudesUsuarioComponent } from './seguimiento-solicitudes-usuario.component';

describe('SeguimientoSolicitudesUsuarioComponent', () => {
  let component: SeguimientoSolicitudesUsuarioComponent;
  let fixture: ComponentFixture<SeguimientoSolicitudesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSolicitudesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSolicitudesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
