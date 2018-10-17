import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   public currentUser: User;

   constructor() { }

   ngOnInit() {
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
