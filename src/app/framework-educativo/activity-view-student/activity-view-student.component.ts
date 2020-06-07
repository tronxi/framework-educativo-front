import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtService} from '../../services/jwt.service';
import {ActivityService} from '../services/activity.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-activity-view-student',
  templateUrl: './activity-view-student.component.html',
  styleUrls: ['./activity-view-student.component.css']
})
export class ActivityViewStudentComponent implements OnInit {

  groupId;
  activities;
  subjectNotFound = false;
  error = false;

  constructor(private router: Router,
              private jwtService: JwtService,
              private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.groupId = params.idGroup;
      this.findActivity(this.groupId);
    });
  }

  findActivity(groupId) {
    this.activityService.findActivity(groupId).subscribe(response => {
      this.activities = response;
      console.log(this.activities);
    }, error => {
      this.subjectNotFound = true;
      this.error = true;
    });
  }

  activityDetail(activityId, activityName, maxDate) {
    this.dataService.activityName = activityName;
    this.dataService.maxDate = maxDate;
    this.router.navigateByUrl('/homepage/activity-detail-student/activity/' + activityId);
  }

}
