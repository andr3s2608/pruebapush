import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSolicitudesDirectivoComponent } from './seguimiento-solicitudes-directivo.component';

describe('SeguimientoSolicitudesDirectivoComponent', () => {
  let component: SeguimientoSolicitudesDirectivoComponent;
  let fixture: ComponentFixture<SeguimientoSolicitudesDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSolicitudesDirectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSolicitudesDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
