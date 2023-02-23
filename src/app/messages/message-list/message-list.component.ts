import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{

  messages: Message[] =[new Message('1','Holiday', 'Tommorow is an holiday','Isiakpona Chuks'),
new Message('2','Assignment','Because of election deadline has been extended', 'Princess Chinedu'),
new Message('3','Congrats','Wonderful attempt keep it up','Paul Murff')];


  onAddMessage(message: Message){
    this.messages.push(message);

  }


constructor(){}

ngOnInit() {

}
}
