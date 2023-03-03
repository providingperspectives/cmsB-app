import {Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class DocumentService{

  documentSelected = new Subject<Document>();
  documentChanged = new Subject <Document[]> ();
  documentListChangedEvent = new Subject <Document[]>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

 private documents: Document[] = [new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[]),
 new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];

 constructor() {this.documents = MOCKDOCUMENTS;
                this.maxDocumentId = this.getMaxId();}

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

  addDocument(newDocument: Document) {
    if (!newDocument) {
        return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

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
let documentsListClone = this.documents.slice();
this.documentListChangedEvent.next(documentsListClone)
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
      return
  }
  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
      return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  let documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);

}

getMaxId(): number {
  let maxId = 0;
  for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
      maxId = currentId;
      }
  }
  return maxId;
}


}
