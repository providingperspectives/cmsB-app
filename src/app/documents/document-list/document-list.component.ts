import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{

 @Output () documentWasSelected = new EventEmitter<Document>();

  documents: Document [] = [new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];

onSelectedDocument(document: Document){
this.documentWasSelected.emit(document);

}

constructor(){}

  ngOnInit() {

  }
}
