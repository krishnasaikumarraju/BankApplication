import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt'
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private profileDetails = new BehaviorSubject<any>({});
  private customerProfile = new Subject<any>();
  public baseUrl = environment.baseUrl;
  public authToken = new BehaviorSubject<any>({});
  public user:any;
  constructor(private http: HttpClient) {
    localStorage.setItem('id_token', '');

  }
  public setAuthToken(token) {
    this.authToken.next(token);
  }
  public getAuthToken() {
    return this.authToken.asObservable();
  } 
  public setCustomerProfile(cusProfile) {
    this.customerProfile.next(cusProfile);
  }
  public getCustomerProfile() {
    return this.customerProfile.asObservable();
  }

  public setProfileDetails(profile) {
    this.profileDetails.next(profile);
  }

  public getProfileDetails() {
    return this.profileDetails.asObservable();
  }

  public getTransactionListByCategory(fetchCategoryId) {
    const trasactionListUrl = this.baseUrl + "transaction-list";
    return this.http.post(trasactionListUrl, fetchCategoryId);
  }
  public storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthToken(localStorage.getItem('id_token'));
    // this.authToken = token;
    this.user = user;
  }
  public onRegisterService(registerData) {
    return this.http.post("http://localhost:3000/users/register", registerData)
  }
  public OnLoginService(loginData){
    return this.http.post("http://localhost:3000/users/authenticate", loginData)
  }
  
  public addCustomerData(addCustomerData){
    return this.http.post("http://localhost:3000/users/addcustomeraccount", addCustomerData);
  }
  public listCustomerData(){
    return this.http.get('http://localhost:3000/users/customers-list')
  }

  // use common post metthod
  public makeTransaction(transactionData) {
    const transactionUrl = "http://localhost:3000/users/transaction"
    return this.http.post(transactionUrl, transactionData);
  }

  public loggedIn(){
    return tokenNotExpired();
  }
  public logout(){
    localStorage.setItem('id_token', '');
    this.setAuthToken(localStorage.getItem('id_token'));
    // this.authToken= null;
    // this.user = null;
    localStorage.clear();
  }
  // profile(){
  //   return this.http.get('http://localhost:3000/users/deposit').subscribe ( (profileData) => { console.log("service call back",profileData)})
  // }
// 
  public searchcustomer(accountno){
    console.log("search customer service", accountno)
    return this.http.post('http://localhost:3000/users/profile', accountno);

  }
}
