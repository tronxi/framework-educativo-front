import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {SubjectService} from '../services/subject.service';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-subject-teacher',
  templateUrl: './update-subject-teacher.component.html',
  styleUrls: ['./update-subject-teacher.component.css']
})
export class UpdateSubjectTeacherComponent implements OnInit {

  loadSubjectForm: FormGroup;
  loadActivityForm: FormGroup;
  groupForm: FormGroup;
  alert: boolean;
  save = false;
  error = false;
  errorDelete = false;
  activityLoadOk = false;
  activityLoadKo = false;
  showNotFound = false;
  showLoadSubjectForm = false;
  groupIdForActivity = new Set();
  subject;
  subjectName;
  year;

  constructor(private formBuilder: FormBuilder,
              private subjectService: SubjectService,
              private activityService: ActivityService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.subjectName = params.subjectId;
      this.year = params.yearId;
      this.buildLoadSubjectForm();
      this.buildLoadActivityForm();
      this.findSubject();
    });
  }

  buildGroupForm() {
    this.groupForm = this.formBuilder.group({
      group: new FormControl('', [
        Validators.required, Validators.maxLength(10), this.uniqueValueValidation(this.subject)
      ]),
    });
  }
  uniqueValueValidation(subject): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const names = subject.groups.filter(group => group.name === control.value);
      if (control.value !== undefined && names.length !== 0) {
        return {uniqueValue: true};
      }
      return null;
    };
  }

  findSubject() {
    this.subjectService.getSubjectByNameYear(this.subjectName, this.year)
      .subscribe(response => {
        this.showLoadSubjectForm = true;
        this.showNotFound = false;
        this.subject = response;
        this.groupIdForActivity = new Set();
        this.buildGroupForm();
        console.log(this.subject);
      }, error => {
        console.log(error);
        this.groupIdForActivity = new Set();
        this.showNotFound = true;
      });
  }

  buildLoadActivityForm() {
    this.loadActivityForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required)
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

  addStudent(subject, group) {
    this.router.navigateByUrl('/homepage/add-student/subject/' + subject + '/group/' + group);
  }

  findActivities(groupId) {
    this.router.navigateByUrl('/homepage/activity-group/subject/' + this.subject.idSubject + '/group/' + groupId);
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

  onSubmitLoadSubject(type) {
    this.groupIdForActivity = new Set();

    if (type === 'update') {
      this.update();
    }
  }

  update() {
    this.subject.name = this.subjectName;
    this.subject.year = this.year;
    console.log(this.subject);
    this.subjectService.updateSubject(this.subject).subscribe(response => {
      this.save = true;
      this.findSubject();
      this.deleteAlerts();
      console.log(response);
    }, error => {
      this.error = true;
      this.deleteAlerts();
      console.log(error);
    });
  }

  deleteAlerts() {
    setTimeout(() => {
      this.save = false;
      this.error = false;
      this.errorDelete = false;
    }, 2000);
  }

  addGroupForActivity(groupId) {
    this.groupIdForActivity.has(groupId)
      ? this.groupIdForActivity.delete(groupId) : this.groupIdForActivity.add(groupId);

  }

  onSubmitActivity() {
    this.activityService.createActivity(this.loadActivityForm.value.name,
      this.loadActivityForm.value.date, Array.from(this.groupIdForActivity))
      .subscribe(response => {
        this.activityLoadOk = true;
        this.deleteAlertsActivity();
        this.groupIdForActivity = new Set();
        this.buildLoadActivityForm();
      }, error => {
        this.activityLoadKo = true;
        this.deleteAlertsActivity();
        this.groupIdForActivity = new Set();
        this.buildLoadActivityForm();
      });
  }

  containCheck(idGroup) {
    return this.groupIdForActivity.has(idGroup);
  }

  deleteAlertsActivity() {
    setTimeout(() => {
      this.activityLoadKo = false;
      this.activityLoadOk = false;
    }, 2000);
  }

}
