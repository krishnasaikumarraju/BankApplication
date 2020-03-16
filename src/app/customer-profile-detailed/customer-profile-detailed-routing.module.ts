import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerProfileDetailedComponent } from './customer-profile-detailed.component';

const routes: Routes = [{ path: '', component: CustomerProfileDetailedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProfileDetailedRoutingModule { }
