import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaTareaDirectivoComponent } from './bandeja-tarea-directivo.component';

describe('BandejaTareaDirectivoComponent', () => {
  let component: BandejaTareaDirectivoComponent;
  let fixture: ComponentFixture<BandejaTareaDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaTareaDirectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaTareaDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
