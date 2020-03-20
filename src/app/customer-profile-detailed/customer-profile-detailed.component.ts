import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service'

@Component({
  selector: 'app-customer-profile-detailed',
  templateUrl: './customer-profile-detailed.component.html',
  styleUrls: ['./customer-profile-detailed.component.css']
})
export class CustomerProfileDetailedComponent implements OnInit {

  constructor(
    private backendApiService: BackendApiService,
  ) { }

  
  ngOnInit(): void {
    console.log('profile details');
    this.getCustomerProfileDetail();
  }

  public getCustomerProfileDetail(): void {
    this.backendApiService.getCustomerProfile().subscribe( profile => {
      console.log('profile details', profile);
    })
  }


}
