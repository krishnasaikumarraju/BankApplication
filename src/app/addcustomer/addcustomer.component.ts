import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})

export class AddcustomerComponent implements OnInit {

  ngOnInit() {
    this.addCustomerForm();
    this.dynamicAccountNumber();
  }
  public createCustomerForm: FormGroup;
  public listCustomerData: any = [];
  public accountnoState;
  private accountnoArray = [];
  constructor(private fb: FormBuilder, private backendApiService: BackendApiService, private router: Router) {

  }

  
  private dynamicAccountNumber(): void {
    this.backendApiService.listCustomerData().subscribe((listCustomerData: Response) => {
      this.listCustomerData = listCustomerData;
      this.listCustomerData.map(fetchMaxAccountno => {
        this.accountnoArray.push(fetchMaxAccountno.accountno);
      });
      this.accountnoState = Math.max.apply(null, this.accountnoArray) + 1;
      this.createCustomerForm.setValue['accountno'] = this.accountnoState;
    });
  }

  public onAddCustomer() {
    const addCustomerData = this.createCustomerForm.value
    this.backendApiService.addCustomerData(addCustomerData).subscribe(addCustomerData => {
      this.router.navigate(['customer'])
    }, error => {
      console.log("error", error);
    })
  }
  private addCustomerForm(): void {
    this.createCustomerForm = this.fb.group({
      "accountno": [{value: this.accountnoState}],
      "firstname": ['', Validators.required],
      "lastname": ['', Validators.required],
      "postalcode": ['', Validators.required],
      "datetime": ['', Validators.required]
    });
  }
}
