import { Component, OnInit } from '@angular/core';
import { User } from '../../users/shared/user.model';
import { EntryModalService } from '../../auth/entry-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
   public currentUser: User;
   isCollapsed = true;

   constructor(public modalService: EntryModalService) { }

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
