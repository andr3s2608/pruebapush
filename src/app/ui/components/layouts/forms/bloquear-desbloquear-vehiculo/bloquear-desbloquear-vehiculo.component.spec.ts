import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquearDesbloquearVehiculoComponent } from './bloquear-desbloquear-vehiculo.component';

describe('BloquearDesbloquearVehiculoComponent', () => {
  let component: BloquearDesbloquearVehiculoComponent;
  let fixture: ComponentFixture<BloquearDesbloquearVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloquearDesbloquearVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquearDesbloquearVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
