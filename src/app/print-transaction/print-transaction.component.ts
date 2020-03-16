import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';

export interface DialogData {
  transactionProfile: any,
  customerProfile: any
}
@Component({
  selector: 'app-print-transaction',
  templateUrl: './print-transaction.component.html',
  styleUrls: ['./print-transaction.component.css']
})
export class PrintTransactionComponent implements OnInit {
  public getProfileObject: { _id, accountno, firstname, lastname, postalcode, datetime };

  constructor(
    private backendApiService: BackendApiService,
    public dialogRef: MatDialogRef<PrintTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    console.log('print transaction data', this.data);
  }

  
  public printTransaction(){
    this.dialogRef.close();
  }

}
