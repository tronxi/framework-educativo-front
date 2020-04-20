import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../services/subject.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {StudentService} from '../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  idSubject;
  idGroup;
  subject: object = {name: '', groups: []};
  group = [{name: ''}];
  subjectNotFound = false;
  student;
  showStudent = false;
  errorStudent = false;
  studentsList;
  showStudentList = false;

  public findUserForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private studentService: StudentService) {
  }

  ngOnInit() {
    this.buildFindSubjectForm();
    this.route.params.subscribe(params => {
      this.idSubject = params.idSubject;
      this.idGroup = params.idGroup;
      this.subjectService.getSubjectById(this.idSubject).subscribe(response => {
        this.subject = response;
        this.group = this.subject.groups.filter(group => group.id_group === this.idGroup);
        if (this.group.length === 0 ) {
          this.subjectNotFound = true;
        } else {
          this.updateStudentList();
        }
      }, error => {
        this.subjectNotFound = true;
      });
    });
  }

  buildFindSubjectForm() {
    this.findUserForm = this.formBuilder.group({
      ident: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    this.showStudent = false;
    this.errorStudent = false;
    console.log(this.findUserForm.value.ident);
    this.userService.getUsers(this.findUserForm.value.ident).subscribe(response => {
      this.student = response;
      this.showStudent = true;
    }, error => {
      this.errorStudent = true;
    });
  }

  addStudent(id) {
    this.studentService.loadStudent(this.idSubject, this.idGroup, id).subscribe(
      response => {
        this.updateStudentList();
        this.showStudent = false;
      }, error => {
        this.showStudent = false;
      }
    );
  }

  updateStudentList() {
    this.studentService.getStudent(this.idSubject, this.idGroup).subscribe(response => {
      console.log(response);
      this.studentsList = response;
      this.showStudentList = true;
    }, error => {
      this.subjectNotFound = true;
      this.showStudentList = false;
    });
  }

  deleteStudent(id) {
    this.studentService.deleteStudent(this.idSubject, this.idGroup, id).subscribe(response => {
      this.updateStudentList();
      }
    );
  }


}
