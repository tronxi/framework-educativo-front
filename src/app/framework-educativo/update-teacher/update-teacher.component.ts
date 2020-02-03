import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubjectService} from '../services/subject.service';

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

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.buildFindSubjectForm();
    this.buildUpdateTeacherForm();
  }

  buildFindSubjectForm() {
    this.findSubjectForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('2019', [
        Validators.required, Validators.min(1970), Validators.max(2900)
      ]),
    });
  }

  buildUpdateTeacherForm() {
    this.updateTeacherForm = this.formBuilder.group({
      name: new FormControl('', [
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
        //this.setData(response);
        //this.buildGroupForm();
      }, error => {
        console.log(error);
        this.showNotFound = true;
        this.showUpdateTeacherForm = false;
      });
  }

  onSubmitUpdateTeacherForm() {
    console.log('aa');
  }

  onSubmit(tipe) {
    console.log('tipe');
  }



}
