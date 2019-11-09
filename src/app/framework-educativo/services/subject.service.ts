import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  loadSubject(subject) {
    return this.http.post(environment.url + '/subject', subject);
  }

  getSubjectByNameYear(name, year) {
    return this.http.get(environment.url + '/subject?name=' + name + '&year=' + year);
  }

  deleteSubjectById(id) {
    return this.http.get(environment.url + '/subject?id=' + id);
  }

  updateSubject(subject) {
    return this.http.put(environment.url + '/subject', subject);
  }
}
