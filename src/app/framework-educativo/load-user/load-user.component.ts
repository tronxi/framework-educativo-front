import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-load-user',
  templateUrl: './load-user.component.html',
  styleUrls: ['./load-user.component.css']
})
export class LoadUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  public loadUserForm: FormGroup;
  private alert: boolean;
  csvContent: string;
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
    console.log(this.loadUserForm.get('file'));
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.loadUserForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }
}
