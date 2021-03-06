import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubjectService} from '../services/subject.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {
  public updateTeacherForm: FormGroup;
  public findSubjectForm: FormGroup;
  private alert: boolean;
  private save = false;
  private error = false;
  private showUpdateTeacherForm = false;
  private showNotFound = false;
  private showDelete = false;
  private errorDelete = false;
  private subject;
  private teachers;
  usersIdent = [];

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService,
              private userService: UserService) { }

  ngOnInit() {
    this.findUsers();
    this.buildFindSubjectForm();
    this.buildUpdateTeacherForm();
  }

  buildFindSubjectForm() {
    this.findSubjectForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('2020', [
        Validators.required, Validators.min(1970), Validators.max(2900)
      ]),
    });
  }

  buildUpdateTeacherForm() {
    this.updateTeacherForm = this.formBuilder.group({
      ident: new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmitFindSubject() {
    this.subjectService.getSubjectByNameYear(this.findSubjectForm.value.name, this.findSubjectForm.value.year)
      .subscribe(response => {
        console.log(response);
        this.showUpdateTeacherForm = true;
        this.showNotFound = false;
        this.subject = response;
        this.subjectService.getSubjectTeachers(this.subject.idSubject)
          .subscribe(res => {
            console.log(res);
            this.teachers = res;
          }, er => {
            console.log(er);
        });
      }, error => {
        console.log(error);
        this.showNotFound = true;
        this.showUpdateTeacherForm = false;
      });
  }

  deleteTeacher(idTeacher) {
    this.subjectService.deleteTeacher(this.subject.idSubject, idTeacher)
      .subscribe( response => {
        this.save = true;
        this.deleteAlerts();
        this.subjectService.getSubjectTeachers(this.subject.idSubject)
          .subscribe(res => {
            this.teachers = res;
            this.buildUpdateTeacherForm();
          }, er => {
            console.log(er);
          });
      }, error => {
        this.errorDelete = true;
        console.log(error);
        this.deleteAlerts();
        this.buildUpdateTeacherForm();
      });
  }

  onSubmitGroupForm() {
    this.subjectService.setTeacher(this.subject.idSubject, this.updateTeacherForm.value.ident)
      .subscribe( response => {
        this.save = true;
        this.deleteAlerts();
        this.subjectService.getSubjectTeachers(this.subject.idSubject)
          .subscribe(res => {
            this.teachers = res;
            this.buildUpdateTeacherForm();
          }, er => {
            console.log(er);
          });
      }, error => {
        this.errorDelete = true;
        console.log(error);
        this.deleteAlerts();
        this.buildUpdateTeacherForm();
      });
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
      this.showDelete = false;
      this.errorDelete = false;
    }, 2000);
  }

  findUsers() {
    this.userService.getUsersByRole('TEACHER').subscribe(response => {
      this.setUsersIdent(response);
    });
  }

  setUsersIdent(response) {
    this.usersIdent = [];
    response.map(user => {
      this.usersIdent.push(user.ident);
    });
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.usersIdent.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
