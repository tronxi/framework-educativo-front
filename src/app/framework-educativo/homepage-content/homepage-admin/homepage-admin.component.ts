import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.css']
})
export class HomepageAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadUser() {
    this.router.navigateByUrl('/homepage/load-user');
  }

  loadTeacher() {
    this.router.navigateByUrl('/homepage/load-teacher');
  }

}
