import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{



  constructor(private messageService: MessageService,
              private route: ActivatedRoute, private router: Router){}

  ngOnInit() { }

  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;

  @Output() messageAdded = new EventEmitter<Message>();
  currentSender: string ='1';


   

   
   onSendMessage() {
     const msgSubject = this.subjectInputRef.nativeElement.value;
     const msgText = this.msgTextInputRef.nativeElement.value;
     const message = new Message ('3', "subject", msgText, this.currentSender);
 
     // this.addMessageEvent.emit(message)
     this.messageService.addMessage(message)
   }
 
   onClear() {
     this.subjectInputRef.nativeElement.value = "";
     this.msgTextInputRef.nativeElement.value = "";
   }
 }



  
