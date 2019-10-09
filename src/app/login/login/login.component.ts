import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {SessionstorageService} from '../../services/sessionstorage.service';
import {Router} from '@angular/router';
import {JwtService} from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private alert: boolean;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private jwt: JwtService,
              private router: Router,
              private localStorage: SessionstorageService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])

    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.alert = true;
      return;
    }
    const user = this.loginForm.get('user').value;
    const pass = this.loginForm.get('password').value;

    this.loginService.login(user, pass).subscribe((response) => {
      this.alert = false;
      this.localStorage.set('token', response);
      this.router.navigateByUrl('/homepage');
    }, (error) => {
      this.alert = true;
      console.log(error.status);
    });
  }
}
