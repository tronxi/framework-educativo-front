import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadUserService} from '../services/load-user.service';

@Component({
  selector: 'app-load-user',
  templateUrl: './load-user.component.html',
  styleUrls: ['./load-user.component.css']
})
export class LoadUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loadUserService: LoadUserService) { }
  public loadUserForm: FormGroup;
  private alert: boolean;
  private file: File;
  private text: string;

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
      this.loadUser(this.csvJSON(this.text));
    };
  }

  loadUser(data) {
    this.loadUserService.loadData(data).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  csvJSON(csv) {
    const lines = csv.split('\n');

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
