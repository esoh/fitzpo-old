import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ExercisesComponent } from './components/exercises/exercises.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { HttpErrorHandlerService } from'./services/http-error-handler.service';
import { UsernameNotTakenValidator } from './validators/username-not-taken.validator';
import { EmailNotTakenValidator } from './validators/email-not-taken.validator';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      LoginComponent,
      SignupComponent,
      DashboardComponent,
      ProfileComponent,
      HomeComponent,
      ExercisesComponent,
      ProgramsComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [
      ValidateService,
      AuthService,
      HttpErrorHandlerService,
      UsernameNotTakenValidator,
      EmailNotTakenValidator
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
