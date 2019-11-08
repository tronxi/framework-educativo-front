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
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
