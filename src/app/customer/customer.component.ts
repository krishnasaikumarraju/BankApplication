import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['accountno', 'firstname', 'lastname', 'postalcode', 'deposit', 'withdraw', 'transaction'];
  listCustomerData: any = [];
  accountno:any ;
  public dataSource;
  constructor(private backendApiService : BackendApiService, private router : Router) { 
    console.log("customercall")
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  ngOnInit() {
    this.getCustomerList();
  }

public getCustomerList(): void {
    this.backendApiService.listCustomerData().subscribe((listCustomerData: Response) => {
      this.listCustomerData = listCustomerData;
      console.log('customers data', listCustomerData);
      this.dataSource = new MatTableDataSource(this.listCustomerData);
      this.dataSource.paginator = this.paginator;
  });
 
}

public applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// public deposit

public profile(selectedProfile): void{
this.backendApiService.setProfileDetails(selectedProfile);
}

}

//export const data = this.listCustomerData

