import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoVendasComponent } from './extrato-vendas.component';

describe('ExtratoVendasComponent', () => {
  let component: ExtratoVendasComponent;
  let fixture: ComponentFixture<ExtratoVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtratoVendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
