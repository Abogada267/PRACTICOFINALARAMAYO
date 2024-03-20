
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../app/core/services/massage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './massages.component.html',
  styleUrls: ['./massages.component.css'] 
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}

export { MessageService };
