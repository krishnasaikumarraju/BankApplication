import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
// import { CustomerComponent } from '../customer/customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrintTransactionComponent } from '../print-transaction/print-transaction.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})


export class DepositComponent implements OnInit {
  public setProfileObjectKey: { accountNo, name, pincode, dob };
  public getProfileObject: { _id, accountno, firstname, lastname, postalcode, datetime };
  public depositForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private backendApiService: BackendApiService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.loadDepositForm();
    // this.setProfileObject();
    this.setProfileObjectKey = {
      accountNo: "Account Number",
      name: "Full Name",
      pincode: "Pincode",
      dob: "Date Of Birth",
    };
    this.loadProfileData();
  }

  public loadProfileData(): void {
    this.backendApiService.getProfileDetails().subscribe(profile => {
      console.log('profile', profile._id);
      this.getProfileObject = profile;
    });
  }
  public loadDepositForm(): void {
    this.depositForm = this.fb.group({
      "transactionAmount": ['500', [Validators.required, Validators.minLength(3)]]
    });
  }

  public subtractDepositAmount() {
    if (this.depositForm.value.transactionAmount > 500) {
      const getOperationValue = Math.floor(this.depositForm.value.transactionAmount / 2);
      this.depositForm.value.transactionAmount = getOperationValue;
    } else {
      return this.depositForm.value.transactionAmount = 500;
    }
  }

  public addDepositAmount() {
    if (this.depositForm.value.transactionAmount > 999) {
      const getOperationValue = this.depositForm.value.transactionAmount * 10;
      this.depositForm.value.transactionAmount = getOperationValue;
    } else {
      return this.depositForm.value.transactionAmount = 1000;
    }
  }
  public onDepositSubmit() {
    const loggedUser: any  = this.backendApiService.user;
    this.depositForm.value['category'] = this.getProfileObject._id;
    this.depositForm.value['accountno'] = this.getProfileObject.accountno;
    this.depositForm.value['autherizorName'] = loggedUser.username;
    this.depositForm.value['mode'] = "deposit";
    this.backendApiService.makeTransaction(this.depositForm.value).subscribe((makeDeposit: any) => {
      if (makeDeposit.success) {
        this._snackBar.open('Deposit', 'Success', {
          duration: 2000,
        });

        const dialogRef = this.dialog.open(PrintTransactionComponent, {
          width: '750px ',
          data: { customerProfile: this.getProfileObject, transactionProfile: makeDeposit}
        }); 
        dialogRef.afterClosed().subscribe(result => {
        });
        this.router.navigate(['customer'])
      }
    }, error => {
      this._snackBar.open('Deposit Failed', error, {
        duration: 2000,
      });
    });
  };



}
