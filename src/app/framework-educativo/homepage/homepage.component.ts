import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import {SessionstorageService} from '../../services/sessionstorage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private jwt: JwtService,
              private router: Router,
              private localStorage: SessionstorageService) { }

  ngOnInit() {
    console.log(this.jwt.getRoles());
  }

  logOut() {
    this.localStorage.set('token', '');
    this.router.navigateByUrl('/');
  }

  home() {
    this.router.navigateByUrl('/homepage');
  }
}
