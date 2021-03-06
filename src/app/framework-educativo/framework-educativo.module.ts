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
import { AddStudentComponent } from './add-student/add-student.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ActivityGroupComponent } from './activity-group/activity-group.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ViewSubjectComponent } from './view-subject/view-subject.component';
import { ActivityViewStudentComponent } from './activity-view-student/activity-view-student.component';
import { ActivityDetailStudentComponent } from './activity-detail-student/activity-detail-student.component';
import { UpdateSubjectTeacherComponent } from './update-subject-teacher/update-subject-teacher.component';
import { ViewSubjectTeacherComponent } from './view-subject-teacher/view-subject-teacher.component';


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
    AddStudentComponent,
    ActivityGroupComponent,
    ActivityDetailComponent,
    ViewSubjectComponent,
    ActivityViewStudentComponent,
    ActivityDetailStudentComponent,
    UpdateSubjectTeacherComponent,
    ViewSubjectTeacherComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule

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
