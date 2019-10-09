import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadUserService} from '../services/load-user.service';

@Component({
  selector: 'app-load-teacher',
  templateUrl: './load-teacher.component.html',
  styleUrls: ['./load-teacher.component.css']
})
export class LoadTeacherComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loadUserService: LoadUserService) { }
  public loadUserForm: FormGroup;
  private alert: boolean;
  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loadUserForm = this.formBuilder.group({
      file: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.loadUserForm.invalid) {
      this.alert = true;
      return;
    }
    this.upload();
  }

  upload() {
    console.log('subir profesor');
  }

}
