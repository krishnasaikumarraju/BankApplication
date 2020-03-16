import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCalculatorComponent } from './money-calculator.component';

describe('MoneyCalculatorComponent', () => {
  let component: MoneyCalculatorComponent;
  let fixture: ComponentFixture<MoneyCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
