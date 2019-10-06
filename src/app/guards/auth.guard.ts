import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalstorageService} from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private localStorage: LocalstorageService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorage.get('token') === '') {
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }

}
