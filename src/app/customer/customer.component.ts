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
  constructor(
    private backendApiService : BackendApiService, 
    private router : Router
    ) { 
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  ngOnInit() {
    this.getCustomerList();
  }

public getCustomerList(): void {
  const reqUrl = "customers-list"
    this.backendApiService.httpServiceGet(reqUrl).subscribe((listCustomerData: Response) => {
      this.listCustomerData = listCustomerData;
      this.dataSource = new MatTableDataSource(this.listCustomerData);
      this.dataSource.paginator = this.paginator;
  });
 
}

public applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// public deposit

public profile(selectedProfile): void{
this.backendApiService.setCustomerProfile(selectedProfile);
}

}

//export const data = this.listCustomerData

