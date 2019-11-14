import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubjectService} from '../services/subject.service';

@Component({
  selector: 'app-load-subject',
  templateUrl: './load-subject.component.html',
  styleUrls: ['./load-subject.component.css']
})
export class LoadSubjectComponent implements OnInit {

  private alert: boolean;
  private save = false;
  private error = false;

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService) { }

  public loadSubjectForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loadSubjectForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('2016', [
        Validators.required, Validators.min(1970), Validators.max(2900)
      ]),
    });
  }

  onSubmit() {
    if (this.loadSubjectForm.invalid) {
      this.alert = true;
      return;
    }
    this.upload();
  }

  upload() {
    this.loadSubjectForm.value.groups = [];
    console.log(this.loadSubjectForm.value);
    this.subjectService.loadSubject(this.loadSubjectForm.value).subscribe(response => {
      this.save = true;
      this.buildForm();
      this.deleteAlerts();
    }, error => {
      this.error = true;
      this.buildForm();
      this.deleteAlerts();
    });
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
    }, 2000);
  }


}
