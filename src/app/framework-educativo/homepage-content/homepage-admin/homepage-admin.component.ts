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

  loadStudentGroup() {
    this.router.navigateByUrl('/homepage/load-student-group');
  }

  loadUser() {
    this.router.navigateByUrl('/homepage/load-user');
  }

  updateUser() {
    this.router.navigateByUrl('/homepage/update-user');
  }

  loadSubject() {
    this.router.navigateByUrl('/homepage/load-subject');
  }

  updateSubject() {
    this.router.navigateByUrl('/homepage/update-subject');
  }

}
