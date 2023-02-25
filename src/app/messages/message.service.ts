import {Injectable, EventEmitter} from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService{
messagesChanged = new EventEmitter<Message[]>();
messageSelected = new EventEmitter<Message>();

private messages : Message [] = [new Message('1','Holiday', 'Tommorow is an holiday','Isiakpona Chuks'),
new Message('2','Assignment','Because of election deadline has been extended', 'Princess Chinedu'),
new Message('3','Congrats','Wonderful attempt keep it up','Paul Murff')];


getMessages(): Message []{

return this.messages.slice();
}

getMessage(id: string) : Message {
    for (let message of this.messages) {
      if(message.id == id) {
         return message;
      }
    }
    return null!;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messagesChanged.emit(this.messages.slice());
  }

  constructor() {
    this.messages = MOCKMESSAGES;
}


}
