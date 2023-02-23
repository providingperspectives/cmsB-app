import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{


  constructor(){}

  ngOnInit() { }

  @ViewChild('idInput') idInputRef!: ElementRef;
  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef!: ElementRef;
  @ViewChild('senderInput') senderInputRef!: ElementRef;

  @Output() messageAdded = new EventEmitter<Message>();


  onSendMessage() {
    const ingID = this.idInputRef.nativeElement.value;
    const ingSubject = this.subjectInputRef.nativeElement.value;
    const ingMessage = this.msgTextInputRef.nativeElement.value;
    const ingSender = this.senderInputRef.nativeElement.value;

    const newMessage = new Message(ingID,ingSubject, ingMessage, ingSender);
    this.messageAdded.emit(newMessage);
  }
onClear(){
  this.messageAdded.emit( );

}



  }

