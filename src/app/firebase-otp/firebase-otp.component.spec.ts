import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseOtpComponent } from './firebase-otp.component';

describe('FirebaseOtpComponent', () => {
  let component: FirebaseOtpComponent;
  let fixture: ComponentFixture<FirebaseOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
