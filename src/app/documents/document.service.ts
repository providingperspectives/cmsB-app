import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { Observable, catchError, throwError, tap } from 'rxjs';



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

 constructor(private http: HttpClient) {this.documents = MOCKDOCUMENTS;
                this.maxDocumentId = this.getMaxId();}

 //getDocuments(): Document []{

 // return this.documents.slice();
 //}

 getDocuments(): Observable<Document[]> {
  return this.http.get<Document[]>('https://cmsb-app-default-rtdb.firebaseio.com/documents.json')
    .pipe(
      tap((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
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
    let documentListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentListClone);

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
let documentListClone = this.documents.slice();
//this.documentListChangedEvent.next(documentsListClone);
this.storeDocuments(documentListClone);
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
  let documentListClone = this.documents.slice();
  //this.documentListChangedEvent.next(documentsListClone);
  this.storeDocuments(documentListClone);

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

storeDocuments(documents: Document[]) {
  const documentsString = JSON.stringify(documents);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.http
    .put('https://cmsb-app-default-rtdb.firebaseio.com/documents.json',
    documentsString, { headers })
    .subscribe(
      (response) => {
        console.log('Documents saved successfully', response);
      },
      (error) => {
        console.error('Error saving documents: ', error);
      });


}
}
