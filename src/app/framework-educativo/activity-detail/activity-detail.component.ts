import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../services/subject.service';
import {ActivityService} from '../services/activity.service';
import {UserService} from '../services/user.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  users;
  subject;
  activity;
  date;
  delivery;
  idSubject;
  idGroup;
  idActivity;
  subjectNotFound = false;
  showSubjectData = false;
  errorDelete = false;
  errorFile = false;

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private activityService: ActivityService,
              private userService: UserService) { }

  ngOnInit() {
    this.findSubject();
  }

  findSubject() {
    this.route.params.subscribe(params => {
      this.idSubject = params.idSubject;
      this.idGroup = params.idGroup;
      this.idActivity = params.idActivity;
      this.subjectService.getSubjectById(params.idSubject).subscribe(response => {
        this.subject = response;
        this.activityService.findActivity(this.idGroup).subscribe(response => {
          this.activity = response;
          this.activity = this.activity.filter(activity => activity.activityId === this.idActivity)[0];
          console.log(this.activity);
          this.date = new Date(this.activity.maxDate);
          this.date = this.date.getFullYear() + '/' + this.date.getMonth()
            + '/' + this.date.getDay();
          this.activityService.findDelivery(this.activity.activityId).subscribe(response => {
            this.delivery = response;
            this.findUsers();
          }, error => {
            this.subjectNotFound = true;
          });
        }, error => {
          this.subjectNotFound = true;
        });
      }, error => {
        this.subjectNotFound = true;
      });
    });
  }

  findUsers() {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
      const usersIdDelivery = [];
      this.delivery.forEach(dlv => usersIdDelivery.push(dlv.userId));
      this.users = this.users
        .filter(user => usersIdDelivery.includes(user.id_user));
      this.showSubjectData = true;
    });
  }

  seeUser(user) {
      return this.delivery.filter(dlv => dlv.userId === user.id_user)[0];
  }

  download(user) {
    console.log(user);
    this.activityService.downloadActivity(this.activity.activityId, user.id_user).subscribe(response => {
      let name = response.headers.get('Content-Disposition');
      name = name.slice(name.search('=') + 1);
      FileSaver.saveAs(response.body, name);
    }, error => {
      this.errorFile = true;
      console.log(error);
    });
  }


  mark(user, mark) {
    console.log(mark);
    console.log(user.id_user);
    this.activityService.activityMark(this.idActivity, user.id_user, mark).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
