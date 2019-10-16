import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {LoadUserService} from '../services/load-user.service';

@Component({
  selector: 'app-load-teacher',
  templateUrl: './load-user.component.html',
  styleUrls: ['./load-user.component.css']
})
export class LoadUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loadUserService: LoadUserService) { }
  roles: any = [
    {
      name: 'Rol Estudiante',
      value: 'STUDENT'
    },
    {
      name: 'Rol Profesor',
      value: 'TEACHER'
    },
    {
      name: 'Rol Administrador',
      value: 'ADMIN',
    },
  ];
  public loadUserForm: FormGroup;
  private alert: boolean;
  private save = false;
  private error = false;
  private listUsers = [];
  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loadUserForm = this.formBuilder.group({
      id_user: new FormControl('', [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
      surnames: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      roles: this.createRoles(this.roles)
    });
  }

  createRoles(roleInputs) {
    const arr = roleInputs.map(role => {
      return new FormControl(false);
    });
    return new FormArray(arr);
  }

  onSubmit() {
    if (this.loadUserForm.invalid) {
      this.alert = true;
      return;
    }
    this.upload();
  }


  getUserData() {
    this.loadUserForm.value.roles = this.loadUserForm.value.roles
      .map((role, index) => {
        if (role !== false) {
          return this.roles[index].value;
        }
      })
      .filter(
        role => role !== undefined
      );
    return this.loadUserForm.value;
  }

  getListUsers() {
    this.listUsers.push(this.getUserData());
    console.log(this.listUsers);
    return this.listUsers;
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
    }, 2000);
  }

  upload() {
    this.loadUserService.loadData(this.getListUsers()).subscribe(response => {
      this.save = true;
      this.buildForm();
      this.deleteAlerts();
      console.log(response);
    }, error => {
      this.error = true;
      this.buildForm();
      this.deleteAlerts();
      console.log(error);
    });
  }

}
