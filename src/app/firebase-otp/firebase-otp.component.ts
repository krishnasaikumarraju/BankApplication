import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {

}

@Component({
  selector: 'app-firebase-otp',
  templateUrl: './firebase-otp.component.html',
  styleUrls: ['./firebase-otp.component.css']
})

export class FirebaseOtpComponent implements OnInit, AfterViewInit {
  public otpForm: FormGroup;
  public popupValidationData: any ;
  public phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  sent;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FirebaseOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) { }

  ngOnInit(): void {
    this.popupValidationData = this.data;
    this.firebaseInitialization();
    this.loadOtpForm(this.data);
    this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved - will proceed with submit function
      },
      'expired-callback': function() {
        // Reset reCAPTCHA?
      }
    });
  }
  ngAfterViewInit(): void {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  public firebaseInitialization(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyCehMN4N3GHKYJr0OyFfW9NwU-8CrljU4s",
      authDomain: "banking-ec354.firebaseapp.com",
      databaseURL: "https://banking-ec354.firebaseio.com",
      projectId: "banking-ec354",
      storageBucket: "banking-ec354.appspot.com",
      messagingSenderId: "1078831589086",
      appId: "1:1078831589086:web:8d96fa6f4aa6b9a35cc44f"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  public loadOtpForm(object?) {
    this.otpForm = this.fb.group({
      "mobileNumber": [object.contactnumber? object.contactnumber: '', Validators.required]
    });
  }

  public otpSubmit(otpData) {
    const appVerifier = this.phoneRecaptchaVerifier;
    const phoneNumber = "+91 " + otpData.mobileNumber.toString();
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // this.sent = true;
        const verification = prompt('Enter verification code');
        if (verification != null) {
          console.log(verification);
          confirmationResult.confirm(verification)
            .then((good) => {
              // all checks out
              console.log('good', good);
              this.cancelVerification('success');
            })
            .catch((bad) => {
              // code verification was bad.
              this.cancelVerification('failed');
              console.log('catch bad', bad);
            });
        } else {
          console.log('No verification code entered');
        }
      })
      .catch((err) => {
        this.cancelVerification('failed');
        console.log('sms not sent', err);
      });

  }
  
  public cancelVerification(verification) {
    this.dialogRef.close(verification);
  }


}
