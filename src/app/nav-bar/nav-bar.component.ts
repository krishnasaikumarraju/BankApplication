import { Component, OnInit } from '@angular/core';
import {BackendApiService} from '../services/backend-api.service';
import { Router } from "@angular/router";
import 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public checkToken = '' ;
  constructor(private backendApiService : BackendApiService, private router : Router) { }


  ngOnInit() {
    this.tokenValidation();
  }
  private tokenValidation() {
    this.backendApiService.getAuthToken().subscribe( getToken => {
      this.checkToken = getToken;
    })
  }
  public onLogoutSubmit(){
    this.backendApiService.logout();
    this.router.navigate(['/authenticate']);
    return false;
  }

}
