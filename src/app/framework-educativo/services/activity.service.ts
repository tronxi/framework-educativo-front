import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  createActivity(name, maxDate, groupId) {
    return this.http.post(environment.url + '/activity-service/activity/', {name, maxDate, groupId});
  }

  findActivity(groupId) {
    return this.http.get(environment.url + '/activity-service/activity/group/' + groupId);
  }
  findDelivery(activityId) {
    return this.http.get(environment.url + '/activity-service/activity/' + activityId + '/detail');

  }
  deleteActivity(groupId, activityId) {
    return this.http.delete(environment.url + '/activity-service/activity/' + activityId + '/group/' + groupId);
  }

  findActivityByStudentId(activityId, studentId) {
    return this.http.get(environment.url + '/activity-service/activity/' + activityId + '/student/' + studentId);
  }

  activityMark(activityId, studentId, mark) {
    return this.http.put(environment.url + '/activity-service/activity/' + activityId
      + '/student/ ' + studentId + ' /mark', {mark} );
  }

  uploadActivity(activityId, studentId, formData) {
    return this.http.put(environment.url + '/activity-service/activity/' + activityId
      + '/student/' + studentId, formData );
  }

  downloadActivity(activityId, studentId) {
    return this.http.get(environment.url + '/activity-service/activity/' + activityId + '/student/' + studentId + '/download', { observe: 'response', responseType: 'blob'});
  }

}
