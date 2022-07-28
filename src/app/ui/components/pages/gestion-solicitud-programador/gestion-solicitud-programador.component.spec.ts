import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSolicitudProgramadorComponent } from './gestion-solicitud-programador.component';

describe('GestionSolicitudProgramadorComponent', () => {
  let component: GestionSolicitudProgramadorComponent;
  let fixture: ComponentFixture<GestionSolicitudProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSolicitudProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSolicitudProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
