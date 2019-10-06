import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {HomepageAdminComponent} from './homepage-content/homepage-admin/homepage-admin.component';
import {HomepageTeacherComponent} from './homepage-content/homepage-teacher/homepage-teacher.component';
import { LoadUserComponent } from './load-user/load-user.component';
import { HomepageStudentComponent } from './homepage-content/homepage-student/homepage-student.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    HomepageContentComponent,
    HomepageAdminComponent,
    HomepageTeacherComponent,
    LoadUserComponent,
    HomepageStudentComponent,
    HomepageComponent
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
    LoadUserComponent,
    HomepageStudentComponent,
    HomepageComponent
  ]
})
export class FrameworkEducativoModule { }
