import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {UserService} from '../services/user.service';
import {SubjectService} from '../services/subject.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css']
})
export class ViewSubjectComponent implements OnInit {

  user;
  subjects;
  subjectNotFound = false;
  error = false;

  constructor(private jwtService: JwtService,
              private userService: UserService,
              private subjectService: SubjectService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    const id = this.jwtService.getId();

    this.userService.getUsersById(id).subscribe(response => {
      this.user = response;
      this.findSubjects();
    }, error => {
      console.log(error);
    });
  }

  findSubjects() {
    this.subjectService.getSubjectByUserId(this.user.id_user).subscribe(response => {
      this.subjects = response;
    }, error => {
      this.subjectNotFound = true;
      this.error = true;
    });
  }

  activityDetail(groupId, subjectName) {
    this.dataService.subjectName = subjectName;
    this.router.navigateByUrl('/homepage/activity-view-student/group/' + groupId);
  }

}
