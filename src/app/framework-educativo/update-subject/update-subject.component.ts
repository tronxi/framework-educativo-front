import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {SubjectService} from '../services/subject.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {

  public loadSubjectForm: FormGroup;
  public findSubjectForm: FormGroup;
  public groupForm: FormGroup;
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
        Validators.required, Validators.min(1970), Validators.max(2900)
      ]),
    });
  }

  buildGroupForm() {
    this.groupForm = this.formBuilder.group({
      group: new FormControl('', [
        Validators.required, Validators.maxLength(10), this.uniqueValueValidation(this.subject)
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
      this.buildGroupForm();
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
    this.subject.name = this.loadSubjectForm.value.name;
    this.subject.year = this.loadSubjectForm.value.year;
    console.log(this.subject);
  }

  delete() {
    console.log(this.subject.idSubject);
    this.subjectService.deleteSubjectById(this.subject.idSubject).subscribe(response => {
      this.showDelete = true;
      this.showLoadSubjectForm = false;
      this.buildLoadSubjectForm();
      this.deleteAlerts();
    }, error => {
      this.errorDelete = true;
      this.deleteAlerts();
      console.log(error);
    });
  }

  deleteGroup(name) {
    this.subject.groups = this.subject.groups.filter(group => group.name !== name);
    console.log(this.subject.groups);
  }

  onSubmitGroupForm() {
    this.subject.groups.push({
      id_subject: this.subject.idSubject,
      id_group: '',
      name: this.groupForm.value.group
    });
    this.resetGroupForm();
  }

  resetGroupForm() {
    this.groupForm.setValue({
      group: ''
    });
  }

  uniqueValueValidation(subject): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const names = subject.groups.filter(group => group.name === control.value);
      if (control.value !== undefined && names.length !== 0) {
        return { uniqueValue: true };
      }
      return null;
    };
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
      this.showDelete = false;
      this.errorDelete = false;
    }, 2000);
  }
}
