import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankmanagerComponent } from './bankmanager/bankmanager.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BankuserComponent } from './bankuser/bankuser.component';
import { CustomersearchComponent } from './customersearch/customersearch.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = 
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'authenticate', component: LoginComponent,  },
  { path: 'register', component: RegisterComponent },
  { path: 'bankuser', component: BankuserComponent, canActivate: [AuthGuard]},
  { path: 'bankmanager', component: BankmanagerComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'addcustomeraccount', component: AddcustomerComponent, canActivate: [AuthGuard] },
  { path: 'customersearch', component: CustomersearchComponent },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'customer-profile', loadChildren: () => import('./customer-profile-detailed/customer-profile-detailed.module').then(m => m.CustomerProfileDetailedModule), canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
