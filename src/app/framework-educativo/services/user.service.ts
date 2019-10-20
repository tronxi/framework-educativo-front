import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadData(data) {
    return this.http.post(environment.url + '/user', data);
  }

  getUsers(ident) {
    return this.http.get(environment.url + '/user?ident=' + ident);
  }
}
