import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
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
import { EntryModalService } from './services/entry-modal.service';

import { AuthModule } from './auth/auth.module';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      DashboardComponent,
      ProfileComponent,
      HomeComponent,
      ExercisesComponent,
      ProgramsComponent
   ],
   imports: [
      NgbModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      AuthModule
   ],
   providers: [
      ValidateService,
      AuthService,
      EntryModalService,
      HttpErrorHandlerService,
      UsernameNotTakenValidator,
      EmailNotTakenValidator
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
