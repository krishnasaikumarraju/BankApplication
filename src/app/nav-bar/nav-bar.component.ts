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
  public checkToken;
  public guestUser = 'Guest User';
  public userProfile: any;
  constructor(private backendApiService : BackendApiService, private router : Router) { }


  ngOnInit() {
    this.getUserProfileDetails();
    this.tokenValidation();
  }
  private getUserProfileDetails(){
    this.backendApiService.getUserProfileDetails().subscribe( profile => {
      this.userProfile = profile;
    });
  }
  private tokenValidation() {
    this.backendApiService.getAuthToken().subscribe( getToken => {
    this.checkToken = getToken;
    })
  }
  public onLogoutSubmit(){
    this.backendApiService.logout();
    this.router.navigate(['/home']);
    return false;

  }

}
