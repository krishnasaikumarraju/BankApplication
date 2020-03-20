import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customersearch',
  templateUrl: './customersearch.component.html',
  styleUrls: ['./customersearch.component.css']
})
export class CustomersearchComponent implements OnInit {
  public findCustomerForm: FormGroup;
  public accountSummary: boolean = true;
  public editProfile : boolean = true;
  public profileDetail: {accountno: Number , firstname: string, lastname: string, postalcode: number} ;
  constructor(
    private fb : FormBuilder, 
    private backendApiService: BackendApiService, 
    private router: Router
    )
  {
     
  }

  ngOnInit() {
    this.loadProfileForm();
  }

  public loadProfileForm(): void {
    this.findCustomerForm = this.fb.group({
      "accountno": [18739099, Validators.required, ]
    });
  }
 
  public onSearchSubmit(): void{
    this.accountSummary = true;
   const accountno = this.findCustomerForm.value;
   const reqUrlParam = "profile";
   this.backendApiService.httpServicePost(reqUrlParam, accountno).subscribe( profileData => {
     this.profileDetail = profileData[0];
   });
  }
  public profileDetailedPage() {
   this.accountSummary = false;
  }

}
