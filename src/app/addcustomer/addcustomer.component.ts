import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { FirebaseOtpComponent } from '../firebase-otp/firebase-otp.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomersearchComponent } from '.././customersearch/customersearch.component';
export interface DialogData {

}

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})

export class AddcustomerComponent implements OnInit {
  ngOnInit() {
    this.dynamicAccountNumber();
    this.addCustomerForm();
    this.updateProfileValidation();
  }
  @Input('updateProfile') updateProfileDetail: any;
  public formHeader: string;
  public createCustomerForm: FormGroup;
  public listCustomerData: any = [];
  public accountnoState;
  private accountnoArray = [];
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private backendApiService: BackendApiService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }



  private dynamicAccountNumber(): void {
    const reqUrl = "customers-list"
    this.backendApiService.httpServiceGet(reqUrl).subscribe((listCustomerData: Response) => {
      this.listCustomerData = listCustomerData;
      this.listCustomerData.map(fetchMaxAccountno => {
        this.accountnoArray.push(fetchMaxAccountno.accountno);
      });
      this.accountnoState = Math.max.apply(null, this.accountnoArray) + 1;
    });
  }

  public updateProfileValidation(): void {
    if (this.updateProfileDetail) {
      this.addCustomerForm(this.updateProfileDetail);
    }
  }
  public onAddCustomer(): void {
    const addCustomerData = this.createCustomerForm.value
    const customerUrl = "addcustomeraccount"
    if (this.formHeader === 'Add') {
      this.backendApiService.httpServicePost(customerUrl, addCustomerData).subscribe(customerdata => {
        this.router.navigate(['customer'])
      }, error => {
        console.log("error", error);
      })
    } else if (this.formHeader === 'Update') {

      const dialogRef = this.dialog.open(FirebaseOtpComponent, {
        width: '250px',
        data: {
          verificationType: 'Profile Update',
          contactnumber: this.createCustomerForm.value.contactnumber
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('result', result);
        if (result === 'success') {
          const updateUrl = 'profile-update/' + this.updateProfileDetail._id;
          this.backendApiService.httpServicePut(updateUrl, this.createCustomerForm.value).subscribe(data => {
            console.log('profile-update', data);
            // this.addCustomerForm(data);
            if (data) {
              this._snackBar.open('Profile Updated', 'Successfully', {
                duration: 3000,
              });

            }

          })

        }
      });
    }

  }

  private addCustomerForm(object?): void {
    this.formHeader = this.updateProfileDetail ? 'Update' : 'Add';
    this.createCustomerForm = this.fb.group({
      "accountno": [object ? object.accountno : this.accountnoState, Validators.required],
      "firstname": [object ? object.firstname : '', Validators.required],
      "lastname": [object ? object.lastname : '', Validators.required],
      "postalcode": [object ? object.postalcode : '', Validators.required],
      "contactnumber": [object ? object.contactnumber : '', Validators.required]
    });
  }
}

