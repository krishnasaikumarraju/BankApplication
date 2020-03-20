import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;
  loginData: {success:any};
  constructor(
    private fb : FormBuilder, 
    private backendApiService: BackendApiService, 
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {

  }

  ngOnInit() {
    this.loadLoginForm();
  }
  public onLoginSubmit(): void{
    const loginData = this.LoginForm.value
    const reqLoginUrl = "authenticate"
    this.backendApiService.httpServicePost(reqLoginUrl, loginData).subscribe((loginData:any) => {
      if(loginData.success){
        localStorage.setItem('id_token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        this.backendApiService.setUserProfileDetails(loginData.user);
        this.backendApiService.setAuthToken(localStorage.getItem('id_token'));
        this._snackBar.open('Logged In', 'Success', {
          duration: 2000,
        });
        this.router.navigate(['bankuser'])
      }
    }, error => {
      console.log("error", error);
    });
  }

  public loadLoginForm(): void {
    this.LoginForm = this.fb.group({
      "username": ['', Validators.required, ],
      "password": ['', Validators.required]
    });
  }

}
