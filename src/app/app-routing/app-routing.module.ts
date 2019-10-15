import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../login/login/login.component';
import {HomepageComponent} from '../framework-educativo/homepage/homepage.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoadStudentGroupComponent} from '../framework-educativo/load-student-group/load-student-group.component';
import {AdminGuard} from '../guards/admin.guard';
import {HomepageContentComponent} from '../framework-educativo/homepage-content/homepage-content.component';
import {LoadUserComponent} from '../framework-educativo/load-user/load-user.component';

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
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
