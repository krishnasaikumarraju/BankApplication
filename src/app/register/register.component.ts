import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registrationForm : FormGroup;
  public signupProvider = new firebase.auth.OAuthProvider('microsoft.com');

  ngOnInit() {
    this.loadRegistrationForm();
    this.firebaseInitialization();
  }
  constructor(
    private fb : FormBuilder, 
    private BackendApiService: BackendApiService, 
    private router:Router
    ) {
  }
  public firebaseInitialization(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyCehMN4N3GHKYJr0OyFfW9NwU-8CrljU4s",
      authDomain: "banking-ec354.firebaseapp.com",
      databaseURL: "https://banking-ec354.firebaseio.com",
      projectId: "banking-ec354",
      storageBucket: "banking-ec354.appspot.com",
      messagingSenderId: "1078831589086",
      appId: "1:1078831589086:web:8d96fa6f4aa6b9a35cc44f"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  public loadRegistrationForm(): void{
    this.registrationForm = this.fb.group({
      "name": ['', [Validators.required, Validators.minLength(3)]],
      "username": ['', Validators.required, ],
      "password": ['', Validators.required],
      "email": ['', Validators.email]
    });
  }

  
  public signInUsingMicrosoft(): void {
    firebase.auth().signInWithPopup(this.signupProvider)
  .then(function(result) {
    console.log('micrtosoft oauth', result.additionalUserInfo.profile);
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
  })
  .catch(function(error) {
    // Handle error.
  });
  }
  public onRegisterSubmit(): void{
    var registerData = this.registrationForm.value
    const registerUrl = "register"
    this.BackendApiService.httpServicePost(registerUrl, registerData).subscribe((registerData : any) => {
      if(registerData.success){
      this.router.navigate(['authenticate']);
    }
    }, error => {
      console.log("error", error);
    }); 
  }
  

 
}
