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
   var accountno = this.findCustomerForm.value;
   this.backendApiService.searchcustomer(accountno).subscribe( profileData => {
     this.backendApiService.setCustomerProfile(profileData);
   });
   this.router.navigate(['/customer-profile'])
  }

}
