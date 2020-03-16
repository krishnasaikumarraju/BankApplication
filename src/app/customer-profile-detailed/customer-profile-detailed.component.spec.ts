import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileDetailedComponent } from './customer-profile-detailed.component';

describe('CustomerProfileDetailedComponent', () => {
  let component: CustomerProfileDetailedComponent;
  let fixture: ComponentFixture<CustomerProfileDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProfileDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
