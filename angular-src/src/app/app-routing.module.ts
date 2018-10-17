import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ExercisesComponent } from './components/exercises/exercises.component';

const routes: Routes = [
   // map home to home component
   {
      path: '',
      component: HomeComponent
   },
   {
      path: 'signup',
      component: SignupComponent
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: 'programs',
      component: ProgramsComponent
   },
   {
      path: 'exercises',
      component: ExercisesComponent
   },
   {
      path: 'profile',
      component: ProfileComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
