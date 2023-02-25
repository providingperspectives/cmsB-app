import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{


  constructor(private mlService: MessageService){}

  ngOnInit() { }

  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;

  @Output() messageAdded = new EventEmitter<Message>();
  currentSender: string ='1';


  onSendMessage() {
    const ingID = this.idInputRef.nativeElement.value;
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.msgTextInputRef.nativeElement.value;


    const newMessage = new Message('3', ingSubject, ingMessage, this.currentSender);
    this.mlService.addMessage(newMessage);
  }

onClear(){
  this.subjectInputRef.nativeElement.value='';
  this.msgTextInputRef.nativeElement.value='';

}



  }
