import { Component, OnInit } from '@angular/core';

import { EntryModalService } from '../../auth/entry-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   constructor(public modalService: EntryModalService) { }

   ngOnInit() {
   }

}
