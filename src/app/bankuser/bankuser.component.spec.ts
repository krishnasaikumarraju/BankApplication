import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankuserComponent } from './bankuser.component';

describe('BankuserComponent', () => {
  let component: BankuserComponent;
  let fixture: ComponentFixture<BankuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
