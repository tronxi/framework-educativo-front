import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadData(userList) {
    return this.http.post(environment.url + '/user-service/user', userList);
  }

  getUsers(ident) {
    return this.http.get(environment.url + '/user-service/user?ident=' + ident);
  }

  getUsersById(id) {
    return this.http.get(environment.url + '/user-service/user/' + id);
  }

  getAllUsers() {
    return this.http.get(environment.url + '/user-service/user');
  }

  getUsersByRole(role) {
    return this.http.get(environment.url + '/user-service/user?role=' + role);
  }

  updateUser(user) {
    return this.http.put(environment.url + '/user-service/user', user);
  }

  deleteUser(ident) {
    return this.http.delete(environment.url + '/user-service/user?ident=' + ident);
  }
}
