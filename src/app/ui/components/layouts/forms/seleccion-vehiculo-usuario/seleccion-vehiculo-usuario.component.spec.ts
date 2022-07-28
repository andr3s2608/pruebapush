import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionVehiculoUsuarioComponent } from './seleccion-vehiculo-usuario.component';

describe('SeleccionVehiculoUsuarioComponent', () => {
  let component: SeleccionVehiculoUsuarioComponent;
  let fixture: ComponentFixture<SeleccionVehiculoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionVehiculoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionVehiculoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
