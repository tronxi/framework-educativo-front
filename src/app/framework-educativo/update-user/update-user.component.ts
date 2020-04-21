import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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
  private showDelete = false;
  private errorDelete = false;
  private user;
  usersIdent = [];

  ngOnInit() {
    this.findUsers();
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

  onSubmitLoadUser(type) {
    if (this.loadUserForm.invalid) {
      this.alert = true;
      return;
    }
    if (type === 'update') {
      this.update();
    } else if (type === 'delete') {
      this.delete();
    }
  }

  onSubmitFindUser() {
    this.userService.getUsers(this.findUserForm.value.ident).subscribe(response => {
      this.showLoadUserForm = true;
      this.showNotFound = false;
      this.setData(response);
      this.user = response;
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

  getUserWithId() {
    const user = this.getUserData();
    user.isChanged = false;
    user.id_user = this.user.id_user;
    console.log(user);
    return user;
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
      this.showDelete = false;
      this.errorDelete = false;
    }, 2000);
  }

  update() {
    this.userService.updateUser(this.getUserWithId()).subscribe(response => {
      this.save = true;
      this.showLoadUserForm = false;
      this.buildLoadUserForm();
      this.deleteAlerts();
      console.log(response);
    }, error => {
      this.error = true;
      this.deleteAlerts();
      console.log(error);
    });
  }

  delete() {
    this.userService.deleteUser(this.getUserWithId().ident).subscribe(response => {
      this.showDelete = true;
      this.showLoadUserForm = false;
      this.buildLoadUserForm();
      this.deleteAlerts();
      console.log(response);
      this.findUsers();
    }, error => {
      this.errorDelete = true;
      this.deleteAlerts();
      console.log(error);
    });
  }

  findUsers() {
    this.userService.getUsersByRole('STUDENT').subscribe(response => {
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
