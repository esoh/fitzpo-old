import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ExercisesComponent } from './components/exercises/exercises.component';


@NgModule({
   declarations: [
      AppComponent,
      DashboardComponent,
      ProfileComponent,
      HomeComponent,
      ExercisesComponent,
      ProgramsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
      AuthModule
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
