import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getStudent(idSubject, idGroup) {
    return this.http.get(environment.url + '/subject-service/subject/' +
      idSubject + '/group/' + idGroup);
  }

  loadStudent(idSubject, idGroup, idStudent) {
    return this.http.post(environment.url + '/subject-service/subject/' +
      idSubject + '/group/' + idGroup, [idStudent]);
  }

  deleteStudent(idSubject, idGroup, idStudent) {
    return this.http.delete(environment.url + '/subject-service/subject/' +
      idSubject + '/group/' + idGroup + '/student/' + idStudent);
  }
}
