import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {HomepageAdminComponent} from './homepage-content/homepage-admin/homepage-admin.component';
import {HomepageTeacherComponent} from './homepage-content/homepage-teacher/homepage-teacher.component';
import { LoadStudentGroupComponent } from './load-student-group/load-student-group.component';
import { HomepageStudentComponent } from './homepage-content/homepage-student/homepage-student.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoadUserComponent } from './load-user/load-user.component';



@NgModule({
  declarations: [
    HomepageContentComponent,
    HomepageAdminComponent,
    HomepageTeacherComponent,
    LoadStudentGroupComponent,
    HomepageStudentComponent,
    HomepageComponent,
    LoadUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
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
