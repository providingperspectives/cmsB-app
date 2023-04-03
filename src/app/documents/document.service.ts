import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { catchError, tap } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class DocumentService{

  documentSelected = new Subject<Document>();
  documentChanged = new Subject <Document[]> ();
  documentListChangedEvent = new Subject <Document[]>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

 documents: Document [];



 //getDocuments(): Document []{

 // return this.documents.slice();
 //}

getDocuments(): Observable<Document[]> {
//return this.http.get<Document[]>('https://cmsb-app-default-rtdb.firebaseio.com/documents.json')
return this.http.get<Document[]>('http://localhost:3000/api/documents')
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
console.log('listed documet '+ document.name + document.id)
if(document.id == id) {
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

  addDocument(document: Document) {
    if (!document) {
        return;
    }

document.id ='';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

// add to database
this.http.post<{ message: string, document: Document }>('http://localhost:3000/api/documents',
document, { headers: headers })
.subscribe(
(responseData) => {
// add new document to documents
this.documents.push(responseData.document);
this.sortAndSend();
}
);
}


updateDocument(originalDocument: Document, newDocument: Document) {
if (!originalDocument || !newDocument) {
return;
}

const pos = this.documents.findIndex(d => d.id === originalDocument.id);

if (pos < 0) {
return;
}

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;


    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/api/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response:any) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  storeDocuments(documents: Document[]) {
    const documentsString = JSON.stringify(documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

  //this.http.put('https://cmsb-app-default-rtdb.firebaseio.com/documents.json'
  this.http.put('http://localhost:3000/api/documents',
  documentsString, { headers })
  .subscribe(
  (response) => {
    console.log('Documents saved successfully', response);
  },
  (error) => {
    console.error('Error saving documents: ', error);
  });

  this.documentListChangedEvent.next(this.documents.slice());
  }

deleteDocument(document: Document) {

if (!document) {
return;
}

const pos = this.documents.findIndex(d => d.id === document.id);

if (pos < 0) {
return;
}


    // delete from database
this.http.delete('http://localhost:3000/api/documents/' + document.id)
.subscribe((response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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



   /* this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document)
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
*/

sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice())
  }

constructor(private http: HttpClient) {this.documents = MOCKDOCUMENTS;
  this.maxDocumentId = this.getMaxId();}

}
