import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

  messages: Message[] =[];


  onAddMessage(message: Message){
    this.messages.push(message);

  }


constructor(private mlService: MessageService){}

ngOnInit() {
 this.messages = this.mlService.getMessages();
 this.mlService.messagesChanged
 .subscribe(
  (messages:Message[]) => {
    this.messages = messages
  });
}
}






