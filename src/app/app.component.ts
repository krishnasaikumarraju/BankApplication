import { Component, OnInit } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xyz app';
  constructor( private backendApiService: BackendApiService) {

  }
  ngOnInit() {
    // this.backendApiService.setUserProfileDetails(localStorage.getItem('user'));
    this.backendApiService.setAuthToken(localStorage.getItem('id_token'));
      }
  // public clearToken() {
  //   localStorage.clear();
  // }
}
