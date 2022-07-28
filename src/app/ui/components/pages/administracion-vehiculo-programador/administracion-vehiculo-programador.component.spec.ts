import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionVehiculoProgramadorComponent } from './administracion-vehiculo-programador.component';

describe('AdministracionVehiculoProgramadorComponent', () => {
  let component: AdministracionVehiculoProgramadorComponent;
  let fixture: ComponentFixture<AdministracionVehiculoProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionVehiculoProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionVehiculoProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
