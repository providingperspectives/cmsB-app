import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})
export class MessagesComponent  {

  messages: Message[] =[];

//selectedMessage!: Message;


//constructor(private messageService: MessageService){ }

//ngOnInit()  {
 // this.messageService.messageSelected
  //.subscribe(
    //(message:Message) => {
     // this.selectedMessage = message;
    //});

//}

}
