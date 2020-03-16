import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
// import { CustomerComponent } from '../customer/customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseOtpComponent } from '../firebase-otp/firebase-otp.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintTransactionComponent } from '../print-transaction/print-transaction.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  public setProfileObjectKey: { accountNo, name, pincode, dob };
  public getProfileObject: { _id, accountno, firstname, lastname, postalcode, datetime };
  public withdrawForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendApiService: BackendApiService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadWithdrawForm();
    // this.setProfileObject();
    this.loadProfileData();
  }

  public onWithdrawSubmit(): void {
    const dialogRef = this.dialog.open(FirebaseOtpComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === 'cancel') {
        this._snackBar.open('Withdraw Verification', 'Cancelled', {
          duration: 2000,
        });
      } else if (result === 'success') {
        this._snackBar.open('Mobile Number Verified', 'Success', {
          duration: 2000,
        });
        const loggedUser: any  = this.backendApiService.user;
        this.withdrawForm.value['category'] = this.getProfileObject._id;
        this.withdrawForm.value['accountno'] = this.getProfileObject.accountno;
        this.withdrawForm.value['autherizorName'] = loggedUser.username;
        this.withdrawForm.value['mode'] = "withdraw";
        this.backendApiService.makeTransaction(this.withdrawForm.value).subscribe((makeWithdraw: any) => {
          if (makeWithdraw.success) {
            this._snackBar.open('Withdraw', 'Success', {
              duration: 2000,
            });

            const dialogRef = this.dialog.open(PrintTransactionComponent, {
              width: '750px ',
              data: { customerProfile: this.getProfileObject, transactionProfile: makeWithdraw }
            });
            dialogRef.afterClosed().subscribe(result => {
            });
            this.router.navigate(['customer'])
          }
        }, error => {
          this._snackBar.open('Withdraw Failed', error, {
            duration: 2000,
          });
        });
      } else if (result === 'failed') {
        this._snackBar.open('Otp Verification', 'Failed', {
          duration: 2000,
        });
      }
    });
  };

  public loadProfileData(): void {
    this.backendApiService.getProfileDetails().subscribe(profile => {
      console.log('profile', profile._id);
      this.getProfileObject = profile;
    });
  }

  public loadWithdrawForm(): void {
    this.setProfileObjectKey = {
      accountNo: "Account Number",
      name: "Full Name",
      pincode: "Pincode",
      dob: "Date Of Birth",
    };

    this.withdrawForm = this.fb.group({
      "transactionAmount": ['500', [Validators.required, Validators.minLength(3)]]
    });
  }

  public subtractWithdrawAmount() {
    console.log('withdraw form data', this.withdrawForm.value);
    if (this.withdrawForm.value.transactionAmount > 500) {
      const getOperationValue = Math.floor(this.withdrawForm.value.transactionAmount / 2);
      this.withdrawForm.value.transactionAmount = getOperationValue;
    } else {
      return this.withdrawForm.value.transactionAmount = 500;
    }
  }

  public addWithdrawAmount() {
    if (this.withdrawForm.value.transactionAmount > 999) {
      const getOperationValue = this.withdrawForm.value.transactionAmount * 10;
      this.withdrawForm.value.transactionAmount = getOperationValue;
    } else {
      return this.withdrawForm.value.transactionAmount = 1000;
    }
  }


}
