import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

  message: Message[] =[];





constructor(private messageService: MessageService){}

ngOnInit() {
  this.messageService.getMessages()
  .subscribe(
    (messages: Message[]) => {
      this.message = messages;
    },
    (error: any) => {
      console.error('Error fetching messages:', error);
    }
  );
}
}






