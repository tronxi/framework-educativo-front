import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../login/login/login.component';
import {HomepageComponent} from '../framework-educativo/homepage/homepage.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoadStudentGroupComponent} from '../framework-educativo/load-student-group/load-student-group.component';
import {AdminGuard} from '../guards/admin.guard';
import {HomepageContentComponent} from '../framework-educativo/homepage-content/homepage-content.component';
import {LoadUserComponent} from '../framework-educativo/load-user/load-user.component';
import {UpdateUserComponent} from '../framework-educativo/update-user/update-user.component';
import {LoadSubjectComponent} from '../framework-educativo/load-subject/load-subject.component';
import {UpdateSubjectComponent} from '../framework-educativo/update-subject/update-subject.component';
import {UpdateTeacherComponent} from '../framework-educativo/update-teacher/update-teacher.component';
import {AddStudentComponent} from '../framework-educativo/add-student/add-student.component';
import {ActivityGroupComponent} from '../framework-educativo/activity-group/activity-group.component';
import {ActivityDetailComponent} from '../framework-educativo/activity-detail/activity-detail.component';
import {StudentGuard} from '../guards/student.guard';
import {ActivityViewStudentComponent} from '../framework-educativo/activity-view-student/activity-view-student.component';
import {ActivityDetailStudentComponent} from '../framework-educativo/activity-detail-student/activity-detail-student.component';
import {UpdateSubjectTeacherComponent} from '../framework-educativo/update-subject-teacher/update-subject-teacher.component';
import {TeacherGuard} from '../guards/teacher.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        component: HomepageContentComponent
      },
      {
        path: 'load-student-group',
        component: LoadStudentGroupComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'load-user',
        component: LoadUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'update-user',
        component: UpdateUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'load-subject',
        component: LoadSubjectComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'update-subject',
        component: UpdateSubjectComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'update-teacher',
        component: UpdateTeacherComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'add-student/subject/:idSubject/group/:idGroup',
        component: AddStudentComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'activity-group/subject/:idSubject/group/:idGroup',
        component: ActivityGroupComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'activity-detail/subject/:idSubject/group/:idGroup/activity/:idActivity',
        component: ActivityDetailComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'activity-view-student/group/:idGroup',
        component: ActivityViewStudentComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'activity-detail-student/activity/:idActivity',
        component: ActivityDetailStudentComponent,
        canActivate: [StudentGuard]
      },
      {
        path: 'update-subject-teacher/subject/:subjectId/year/:yearId',
        component: UpdateSubjectTeacherComponent,
        canActivate: [TeacherGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
