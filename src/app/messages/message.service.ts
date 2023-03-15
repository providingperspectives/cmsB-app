import {Injectable, EventEmitter, } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { catchError, Observable, Subject, tap, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MessageService{
messageChanged = new EventEmitter<Message[]>();
messageSelected = new EventEmitter<Message>();
messageChangedEvent = new Subject<Message[]>();
messageListChangedEvent  = new Subject<Message[]>();
maxMessageId!: number;

private messages : Message [] = [new Message('1','Holiday', 'Tommorow is an holiday','Isiakpona Chuks'),
new Message('2','Assignment','Because of election deadline has been extended', 'Princess Chinedu'),
new Message('3','Congrats','Wonderful attempt keep it up','Paul Murff')];


getMessages(): Observable<Message[]>{
  //return this.messages.slice();
  return this.http.get<Message[]>('https://cmsb-app-default-rtdb.firebaseio.com/messages.json')
  .pipe(
    tap((messages: Message[])=>{
      this.messages = messages;
      //console.log(Messages)
      this.maxMessageId = this.getMaxId();
      //console.log(this.getMaxId)
      this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
      this.messageListChangedEvent.next(this.messages.slice());
    }),
    catchError(error =>{
      console.error(error);
      return throwError(error);
    })
  )
}

getMessage(id: string) : Message {
  for (const message of this.messages) {
    if(message.id === id) {
       return message;
    }
  }
  return null!;
}

addMessage(messages: Message) {
  this.messages.push(messages);
  this.messageChanged.emit(this.messages.slice());
  console.log('sendMessage is working');
  let messageListClone = this.messages.slice();
  this.storeMessages(messageListClone)
}

storeMessages(messages: Message[]) {
  const messageString = JSON.stringify(messages);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.http
    .put('https://cmsb-app-default-rtdb.firebaseio.com/messages.json', messageString, { headers })
    .subscribe(
      (response) => {
        console.log('Messages saved successfully', response);
      },
      (error) => {
        console.error('Error saving messages: ', error);
      });

  this.messageListChangedEvent.next(this.messages.slice());
}

getMaxId(): number {
  let maxId = 0;
  for (let messages of this.messages) {
      let currentId = parseInt(messages.id);
      if (currentId > maxId) {
      maxId = currentId;
      }
  }
  return maxId;
}

constructor(private http: HttpClient){
  this.messages = MOCKMESSAGES;
  this.maxMessageId = this.getMaxId();
}
}
