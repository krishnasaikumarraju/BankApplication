import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt'
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private userProfileDetails = new BehaviorSubject<any>({});
  private customerProfile = new BehaviorSubject<any>({});
  public baseUrl = environment.baseUrl;
  public authToken = new BehaviorSubject<any>({});
  public user:any;
  constructor(private http: HttpClient) {
  }

  /* Common post Method */
  public httpServicePost( reqUrlParam, reqData) {
    return this.http.post(this.baseUrl + reqUrlParam, reqData );
  }
  /* Common Get Method */
  public httpServiceGet(reqUrlParam) {
    return this.http.get(this.baseUrl + reqUrlParam);
  }
  /* Common Put Method */
  public httpServicePut(reqUrlParam, dataToUpdate){
    return this.http.put(this.baseUrl + reqUrlParam, dataToUpdate);
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
  public setUserProfileDetails(profile) {
    this.userProfileDetails.next(profile);
  }
  public getUserProfileDetails() {
    return this.userProfileDetails.asObservable();
  }
  public storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthToken(localStorage.getItem('id_token'));
    this.setUserProfileDetails(localStorage.getItem('user'));
    this.user = user;
  }
  public loggedIn(){
    return tokenNotExpired();
  }
  public logout(){
    localStorage.setItem('id_token', '');
    this.setAuthToken(localStorage.getItem('id_token'));
    this.setUserProfileDetails({});
    localStorage.clear();
  }
}
