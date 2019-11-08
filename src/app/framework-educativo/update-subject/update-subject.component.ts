import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Subject} from 'rxjs';
import {SubjectService} from '../services/subject.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {

  public loadSubjectForm: FormGroup;
  public findSubjectForm: FormGroup;
  private alert: boolean;
  private save = false;
  private error = false;
  private showLoadSubjectForm = false;
  private showNotFound = false;
  private showDelete = false;
  private errorDelete = false;
  private subject;

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.buildFindSubjectForm();
    this.buildLoadSubjectForm();
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

  buildLoadSubjectForm() {
    this.loadSubjectForm = this.formBuilder.group({
      id: new FormControl('', [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmitFindSubject() {
    this.subjectService.getSubjectByNameYear(this.findSubjectForm.value.name, this.findSubjectForm.value.year)
      .subscribe(response => {
      console.log(response);
      this.showLoadSubjectForm = true;
      this.showNotFound = false;
      this.subject = response;
      this.setData(response);
    }, error => {
      console.log(error);
      this.showNotFound = true;
      this.showLoadSubjectForm = false;
    });
  }

  setData(data) {
    this.loadSubjectForm.setValue({
      id: data.idSubject,
      name: data.name,
      year: data.year
    });
  }

  onSubmitLoadSubject(type) {
    if (this.loadSubjectForm.invalid) {
      this.alert = true;
      return;
    }
    if (type === 'update') {
      this.update();
    } else if (type === 'delete') {
      this.delete();
    }
  }

  update() {
    console.log('update');
  }

  delete() {
    console.log('delete');
  }

}
