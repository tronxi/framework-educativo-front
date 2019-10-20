import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadData(userList) {
    return this.http.post(environment.url + '/user', userList);
  }

  getUsers(ident) {
    return this.http.get(environment.url + '/user?ident=' + ident);
  }

  updateUser(user) {
    return this.http.put(environment.url + '/user', user);
  }

  deleteUser(ident) {
    return this.http.delete(environment.url + '/user?ident=' + ident);
  }
}
