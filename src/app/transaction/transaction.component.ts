import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PrintTransactionComponent } from '../print-transaction/print-transaction.component';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public displayedColumns: string[] = ['accountno', 'mode', 'transactionAmount', 'autherizorName', 'transactionDate', 'balance', 'option'];
  public getProfileObject: { _id, accountno, firstname, lastname, postalcode, datetime };
  public transactionSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( 
    private backendApiService: BackendApiService,
    public dialog: MatDialog,
    ) { }

  ngOnInit( ) {
    this.listTransactions();
    this.loadProfileData();
  }

  public loadProfileData(): void {
    this.backendApiService.getCustomerProfile().subscribe(profile => {
      this.getProfileObject = profile;
    });
  }

  public listTransactions(): void {
    this.backendApiService.getCustomerProfile().subscribe(profile => {
      const reqUrl = "transaction-list"
    this.backendApiService.httpServicePost(reqUrl, profile).subscribe( data => {
      const transactions: any = data;
      this.transactionSource = new MatTableDataSource(transactions);
      this.transactionSource.paginator = this.paginator;
    });

      this.getProfileObject = profile;
    });
  }
  public applyFilter(filterValue: string) {
    this.transactionSource.filter = filterValue.trim().toLowerCase();
  }


  public printView(data): void {
    const dialogRef = this.dialog.open(PrintTransactionComponent, {
      width: '750px ',
      data: { customerProfile: this.getProfileObject, transactionProfile: { transactionData : data}}
    }); 
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
