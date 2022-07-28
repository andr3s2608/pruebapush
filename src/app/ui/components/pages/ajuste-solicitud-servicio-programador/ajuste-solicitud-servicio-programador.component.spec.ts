import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteSolicitudServicioProgramadorComponent } from './ajuste-solicitud-servicio-programador.component';

describe('AjusteSolicitudServicioProgramadorComponent', () => {
  let component: AjusteSolicitudServicioProgramadorComponent;
  let fixture: ComponentFixture<AjusteSolicitudServicioProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteSolicitudServicioProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteSolicitudServicioProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
