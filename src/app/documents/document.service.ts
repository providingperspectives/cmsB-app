import {Injectable, EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';



@Injectable({
  providedIn: 'root'
})

export class DocumentService{

  documentSelected = new EventEmitter<Document>();
  documentChanged = new EventEmitter <Document[]> ();

 private documents: Document[] = [new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];

 constructor() {this.documents = MOCKDOCUMENTS;}

 getDocuments(): Document []{

  return this.documents.slice();
 }

  getDocument(id: string) : Document {
    for (let document of this.documents) {
      if(document.id === id) {
         return document;
      }
    }
    return null!;
  }

  getSingleDocument(id: number){
    console.log('get Single Document '+ id)
    let i = 0;
    for(i = 0; i < this.documents.length; i++) {
      const document = this.documents[i];
      if (id == parseInt(document.id)) {
        break;
      }
    }
    return this.documents[i]
  }


  deleteDocument(document: Document) {
    if (!document) {
        return;
    }
const pos = this.documents.indexOf(document);
if (pos < 0) {
   return;
}
this.documents.splice(pos, 1);
this.documentChanged.emit(this.documents.slice());

}

}
