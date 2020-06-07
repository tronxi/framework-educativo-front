import { Component, OnInit } from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../services/subject.service';

@Component({
  selector: 'app-activity-group',
  templateUrl: './activity-group.component.html',
  styleUrls: ['./activity-group.component.css']
})
export class ActivityGroupComponent implements OnInit {

  subject;
  group;
  activities;
  idSubject;
  idGroup;

  subjectNotFound = false;
  showSubjectData = false;
  errorDelete = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private activityService: ActivityService,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.findSubject();
  }

  findSubject() {
    this.route.params.subscribe(params => {
      this.idSubject = params.idSubject;
      this.idGroup = params.idGroup;
      this.subjectService.getSubjectById(params.idSubject).subscribe(response => {
        this.subject = response;
        this.showSubjectData = true;
        this.group = this.subject.groups.filter(group => group.id_group === this.idGroup);
        if (this.group.length === 0 ) {
          this.subjectNotFound = true;
        } else {
          this.findActivities(this.idGroup);
        }
      }, error => {
        this.subjectNotFound = true;
      });
    });
  }

  findActivities(groupId) {
    this.activityService.findActivity(groupId).subscribe(response => {
      console.log(response);
      this.activities = response;
    }, error => {
      console.log(error);
    });
  }

  deleteActivity(activityId) {
    console.log(activityId + this.idGroup);
    this.activityService.deleteActivity(this.idGroup, activityId).subscribe(response => {
      this.findActivities(this.idGroup);
    }, error => {
      this.errorDelete = true;
      this.deleteAlerts();
    });
  }

  seeActivity(activityId) {
    this.router.navigateByUrl('/homepage/activity-detail/subject/' + this.subject.idSubject + '/group/' +
      this.idGroup + '/activity/' + activityId);
  }

  deleteAlerts() {
    setTimeout(() => {
      this.errorDelete = false;
    }, 2000);
  }


}
