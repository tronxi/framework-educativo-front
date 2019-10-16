import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadUserService} from '../services/load-user.service';

@Component({
  selector: 'app-load-user',
  templateUrl: './load-student-group.component.html',
  styleUrls: ['./load-student-group.component.css']
})
export class LoadStudentGroupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loadUserService: LoadUserService) { }
  public loadUserForm: FormGroup;
  private alert: boolean;
  private file: File;
  private text: string;
  private save = false;
  private error = false;

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

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  upload() {
    const fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      this.text = fileReader.result.toString();
      console.log(this.csvJSON(this.text));
      this.loadUser(this.addRolesAndPassword(this.csvJSON(this.text)));
    };
  }

  addRolesAndPassword(data) {
    data.forEach(user => {
      user.roles = ['STUDENT'];
      user.password = user.id_user;
    });
    return data;
  }

  loadUser(data) {
    this.loadUserService.loadData(data).subscribe(response => {
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

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
    }, 2000);
  }

  csvJSON(csv) {
    const lines = csv.split('\r\n');

    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }

  onSubmit() {
    if (this.loadUserForm.invalid) {
      this.alert = true;
      return;
    }
    this.upload();
  }

}
