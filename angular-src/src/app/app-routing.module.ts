import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
