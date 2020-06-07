import {Component, OnInit} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {SubjectService} from '../services/subject.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-subject-teacher',
  templateUrl: './view-subject-teacher.component.html',
  styleUrls: ['./view-subject-teacher.component.css']
})
export class ViewSubjectTeacherComponent implements OnInit {

  subjectNotFound;
  error;
  subjects;

  constructor(private jwtService: JwtService,
              private subjectService: SubjectService,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.jwtService.getId());
    this.findSubjectByTeacherId(this.jwtService.getId());
  }

  findSubjectByTeacherId(teacherId) {
    this.subjectService.getSubjectByTeacherId(teacherId)
      .subscribe(response => {
        this.subjects = response;
      }, error => {
        this.subjectNotFound = true;
        this.error = true;
      });
  }

  subjectDetail(name, year) {
    this.router.navigateByUrl('/homepage/update-subject-teacher/subject/' + name
    + '/year/' + year);
  }

}
