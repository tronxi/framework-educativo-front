import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(user: string, pass: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + window.btoa(user + ':' + pass));

    return this.http.post(environment.url + '/login', {}, {
      headers,
      responseType: 'text'
    });
  }
}
