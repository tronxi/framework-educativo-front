import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

  set(key, value) {
    sessionStorage.setItem(key, value);
  }

  get(key) {
    return sessionStorage.getItem(key);
  }
}
