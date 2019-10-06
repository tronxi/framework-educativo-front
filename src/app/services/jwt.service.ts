import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {LocalstorageService} from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private localStorage: LocalstorageService) { }


  getDecodedAccessToken() {
    try {
      return jwt_decode(this.localStorage.get('token'));
    } catch (Error) {
      return null;
    }
  }

  getUser() {
    return this.getDecodedAccessToken().user;
  }

  getRoles() {
    return this.getDecodedAccessToken().roles;
  }

  getStudentRole() {
    return this.getDecodedAccessToken().roles.includes('ROLE_STUDENT');
  }

  getTeacherRole() {
    return this.getDecodedAccessToken().roles.includes('ROLE_TEACHER');
  }

  getAdminRole() {
    return this.getDecodedAccessToken().roles.includes('ROLE_ADMIN');
  }


}
