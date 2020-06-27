import {Component, OnInit} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {ActivityService} from '../services/activity.service';

@Component({
  selector: 'app-activity-detail-student',
  templateUrl: './activity-detail-student.component.html',
  styleUrls: ['./activity-detail-student.component.css']
})
export class ActivityDetailStudentComponent implements OnInit {

  activityId;
  activity;
  subjectNotFound = false;
  error = false;
  name;
  file;

  constructor(private jwtService: JwtService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private activityService: ActivityService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.activityId = params.idActivity;
      this.findActivity();
    });
  }

  getDate() {
    const date = new Date(this.dataService.maxDate);
    return date.getFullYear() + '/' + date.getMonth()
      + '/' + date.getDay();
  }

  findActivity() {
    this.activityService.findActivityByStudentId(this.activityId, this.jwtService.getId())
      .subscribe(response => {
        this.activity =  response;
        console.log(this.activity);
      }, error => {
        this.error = true;
        this.subjectNotFound = true;
      });
  }

  upload(activityId) {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('name', '');

    this.activityService.uploadActivity(activityId, this.jwtService.getId(), formData)
      .subscribe(response => {
        this.findActivity();
      }, error => {
        this.error = true;
      });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  buttonActive() {
    return !this.activity.finished && this.file != null;
  }


}
