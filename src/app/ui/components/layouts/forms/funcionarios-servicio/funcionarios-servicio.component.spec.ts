import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosServicioComponent } from './funcionarios-servicio.component';

describe('FuncionariosServicioComponent', () => {
  let component: FuncionariosServicioComponent;
  let fixture: ComponentFixture<FuncionariosServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
