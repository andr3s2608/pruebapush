import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasDirectivasProgramadorComponent } from './rutas-directivas-programador.component';

describe('RutasDirectivasProgramadorComponent', () => {
  let component: RutasDirectivasProgramadorComponent;
  let fixture: ComponentFixture<RutasDirectivasProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasDirectivasProgramadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasDirectivasProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
