import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {HomepageAdminComponent} from './homepage-content/homepage-admin/homepage-admin.component';
import {HomepageTeacherComponent} from './homepage-content/homepage-teacher/homepage-teacher.component';
import { LoadStudentGroupComponent } from './load-student-group/load-student-group.component';
import { HomepageStudentComponent } from './homepage-content/homepage-student/homepage-student.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadUserComponent } from './load-user/load-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoadSubjectComponent } from './load-subject/load-subject.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';



@NgModule({
  declarations: [
    HomepageContentComponent,
    HomepageAdminComponent,
    HomepageTeacherComponent,
    LoadStudentGroupComponent,
    HomepageStudentComponent,
    HomepageComponent,
    LoadUserComponent,
    UpdateUserComponent,
    LoadSubjectComponent,
    UpdateSubjectComponent,
    UpdateTeacherComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
  exports: [
    HomepageContentComponent,
    HomepageAdminComponent,
    HomepageTeacherComponent,
    LoadStudentGroupComponent,
    LoadUserComponent,
    HomepageStudentComponent,
    HomepageComponent
  ]
})
export class FrameworkEducativoModule { }
