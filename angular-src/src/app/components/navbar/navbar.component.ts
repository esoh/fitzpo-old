import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
   public currentUser: User;
   isCollapsed = true;

   constructor(private modalService: NgbModal) { }

   openLogin(){
      this.modalService.open(LoginComponent, { windowClass : "entry-dialog" });
   }

   openSignup(){
      this.modalService.open(SignupComponent, { windowClass : "entry-dialog" });
   }

   //TODO: remove this function
   testLogin(){
      const tempUser = new User();
      tempUser.username = "tempUser";
      this.currentUser = tempUser;
   }

   //TODO: remove this function
   testLogout(){
      this.currentUser = null;
   }
}
