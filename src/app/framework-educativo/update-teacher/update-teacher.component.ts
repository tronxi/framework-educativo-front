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
  public groupForm: FormGroup;
  private alert: boolean;
  private save = false;
  private error = false;
  private showUpdateTeacherForm = false;
  private showNotFound = false;
  private showDelete = false;
  private errorDelete = false;
  private subject;

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.buildFindSubjectForm();
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

  onSubmitFindSubject() {
    this.subjectService.getSubjectByNameYear(this.findSubjectForm.value.name, this.findSubjectForm.value.year)
      .subscribe(response => {
        console.log(response);
        this.showUpdateTeacherForm = true;
        this.showNotFound = false;
        this.subject = response;
        //this.setData(response);
        //this.buildGroupForm();
      }, error => {
        console.log(error);
        this.showNotFound = true;
        this.showUpdateTeacherForm = false;
      });
  }


}
