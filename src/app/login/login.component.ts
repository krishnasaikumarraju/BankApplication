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
    private BackendApiService: BackendApiService, 
    private router: Router,
    private _snackBar: MatSnackBar,

    ) {

  }

  ngOnInit() {
    this.loadLoginForm();
  }
  public onLoginSubmit(): void{
    const loginData = this.LoginForm.value
    
    this.BackendApiService.OnLoginService(loginData).subscribe((loginData:any) => {
      console.log('log data', loginData);
      if(loginData.success){
        this.BackendApiService.storeUserData(loginData.token, loginData.user);
        this._snackBar.open('Logged In', 'Success', {
          duration: 2000,
        });
        this.router.navigate(['bankuser'])
      }
      console.log("post request for user login is succesful", loginData);
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
