import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileDetailedRoutingModule } from './customer-profile-detailed-routing.module';
import { CustomerProfileDetailedComponent } from './customer-profile-detailed.component';
import { BackendApiService } from '../services/backend-api.service';


// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';


// import {MatButtonModule, MatCheckboxModule, MatInputModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// flex
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [CustomerProfileDetailedComponent],
  imports: [
    CommonModule,
    CustomerProfileDetailedRoutingModule,
    // Angular Material
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    FlexLayoutModule
  ],
  exports: [MatButtonModule, ReactiveFormsModule,MatDialogModule, MatSnackBarModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatTableModule, MatPaginatorModule],
  providers: [BackendApiService, MatDialogModule],

})
export class CustomerProfileDetailedModule { }
