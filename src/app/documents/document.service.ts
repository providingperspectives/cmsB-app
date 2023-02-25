import {Injectable, EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';



@Injectable({
  providedIn: 'root'
})


export class DocumentService{

  documentSelected = new EventEmitter<Document>();

 private documents: Document[] = [new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];


 getDocuments(): Document []{

  return this.documents.slice();
 }

  getDocument(id: string) : Document {
    for (let document of this.documents) {
      if(document.id == id) {
         return document;
      }
    }
    return null!;
  }
  
  constructor() {
    this.documents = MOCKDOCUMENTS;
}
}