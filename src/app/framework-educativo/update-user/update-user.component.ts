import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }
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
  public findUserForm: FormGroup;
  private alert: boolean;
  private save = false;
  private error = false;
  private showLoadUserForm = false;
  private showNotFound = false;
  private listUsers = [];
  ngOnInit() {
    this.buildLoadUserForm();
    this.buildFindUserForm();
  }
  private buildFindUserForm() {
    this.findUserForm = this.formBuilder.group(
      {
        ident: new FormControl('', [
          Validators.required,
        ]),
      }
    );
  }
  private buildLoadUserForm() {
    this.loadUserForm = this.formBuilder.group({
      ident: new FormControl('', [
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

  onSubmitLoadUser() {
    if (this.loadUserForm.invalid) {
      this.alert = true;
      return;
    }
    this.upload();
  }

  onSubmitFindUser() {
    this.userService.getUsers(this.findUserForm.value.ident).subscribe(response => {
      this.showLoadUserForm = true;
      this.showNotFound = false;
      this.setData(response);
      console.log(response);
    },
      error => {
      this.showNotFound = true;
      this.showLoadUserForm = false;
      console.log(error);
      });
  }
  setData(data) {
    this.loadUserForm.setValue({
      ident: data.ident,
      name: data.name,
      surnames: data.surnames,
      password: data.ident,
      email: data.email,
      roles: [data.roles.includes('STUDENT'),
        data.roles.includes('TEACHER'),
        data.roles.includes('ADMIN')]
    });
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
    const user = this.getUserData();
    user.isChanged = false;
    console.log(user);
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
    this.userService.loadData(this.getListUsers()).subscribe(response => {
      this.save = true;
      this.buildLoadUserForm();
      this.deleteAlerts();
      console.log(response);
    }, error => {
      this.error = true;
      this.buildLoadUserForm();
      this.deleteAlerts();
      console.log(error);
    });
  }

}
