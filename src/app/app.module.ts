// Default Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Used Components

import { AppComponent } from './app.component';
import { BankmanagerComponent } from './bankmanager/bankmanager.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';

// Http Module
import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Service Components
import { BackendApiService } from './services/backend-api.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BankuserComponent } from './bankuser/bankuser.component';
import { CustomersearchComponent } from './customersearch/customersearch.component';
import { ProfileComponent } from './profile/profile.component';
import { FirebaseOtpComponent } from './firebase-otp/firebase-otp.component';
import { PrintTransactionComponent } from './print-transaction/print-transaction.component';

//guards
import {AuthGuard} from './guards/auth.guard';

// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';


// import {MatButtonModule, MatCheckboxModule, MatInputModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// flex
import { FlexLayoutModule } from "@angular/flex-layout";

// print
import {NgxPrintModule} from 'ngx-print';
import { MoneyCalculatorComponent } from './money-calculator/money-calculator.component';


@NgModule({
  declarations: [
    AppComponent,
    BankmanagerComponent,
    CustomerComponent,
    HomeComponent,
    TransactionComponent,
    DepositComponent,
    WithdrawComponent,
    AddcustomerComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    BankuserComponent,
    CustomersearchComponent,
    ProfileComponent,
    FirebaseOtpComponent,
    PrintTransactionComponent,
    MoneyCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPrintModule,
    HttpClientModule,

    // Angular Material
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
    FlexLayoutModule

  ],
  exports: [
    MatButtonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatSnackBarModule, 
    MatCheckboxModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule
    ],
  // Backend Api call
  providers: [BackendApiService, AuthGuard, MatDialogModule],

  //Design
  bootstrap: [AppComponent]
})
export class AppModule { }
