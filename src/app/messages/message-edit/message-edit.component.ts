import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{



  constructor(private messageService: MessageService){}

  ngOnInit() { }

  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;




   onSendMessage(message: Message) {
    // const msgSubject = this.subjectInputRef.nativeElement.value;
     //const msgText = this.msgTextInputRef.nativeElement.value;
     //const message = new Message ('3', "subject", msgText, this.currentSender);

     // this.addMessageEvent.emit(message)
     this.messageService.addMessage(message)
   }

   onAddItem() {
    const ingID = this.idInputRef.nativeElement.value;
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.msgTextInputRef.nativeElement.value;
    const ingSender = this.senderInputRef.nativeElement.value;

    const newMessage = new Message (ingID, ingSubject, ingMessage, ingSender);
    this.messageService.addMessage(newMessage);
    console.log('Message-edit is working');
   }

   onClear() {
     this.subjectInputRef.nativeElement.value = "";
     this.msgTextInputRef.nativeElement.value = "";
   }
 }




