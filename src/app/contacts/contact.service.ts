import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import { catchError, tap } from "rxjs/operators";
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {


contactSelected = new Subject<Contact>();
contactChanged = new Subject<Contact[]>();
contactListChangedEvent = new Subject <Contact[]>();
contactChangedEvent = new Subject<Contact[]>();
startedEditing = new Subject<number>();
maxContactId: number;


contacts: Contact [];

constructor(private http: HttpClient)
              { this.contacts = MOCKCONTACTS;
              this.maxContactId = this.getMaxId();

  }

getContacts(): Observable<Contact[]>{

//return this.http.get<Contact[]>('https://cmsb-app-default-rtdb.firebaseio.com/contacts.json')
return this.http.get<Contact[]>('http://localhost:3000/api/contacts')
.pipe(
  tap((contacts:Contact[]) => {
    this.contacts = contacts;
    this.maxContactId = this.getMaxId();
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contactListChangedEvent.next(this.contacts.slice());
  }),
  catchError(error => {
    console.error(error);

    return throwError(error);
  })
);
}

getContact(id: string) : Contact {
  for (let contact of this.contacts) {
    if(contact.id === id) {
       return contact;
    }
  }
  return null!;
}

getSingleContact(id: number){
  return this.contacts[id];
}

/*
addContact(newContact: Contact) {
  if (!newContact) {
      return;
  }

  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact)
  let contactsListClone = this.contacts.slice();
  //this.contactListChangedEvent.next(contactsListClone);
  this.storeContacts(contactsListClone);

}

updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    console.log('this is '+ originalContact)
      return
  }
  let pos = this.contacts.indexOf(originalContact);
  if (pos < 0) {
    console.log('this is the position of the contact' + pos)
      return;
  }

  newContact.id = originalContact.id;
  this.contacts[pos] = newContact;
  let contactsListClone = this.contacts.slice();
  //this.contactListChangedEvent.next(contactsListClone);
  this.storeContacts(contactsListClone)

}
*/
addContact(contacts: Contact) {
  if (!contacts) {
    return;
}

/*
let pos = this.contacts.indexOf(contact);
if (pos < 0) {
    return;
}

this.contacts.splice(pos, 1);
let contactsListClone = this.contacts.slice();
//this.contactChanged.next(contactsListClone);
this.storeContacts(contactsListClone)
}



storeContacts(contacts: Contact[]) {
  const contactString = JSON.stringify(contacts);
*/

contacts.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json' });

  //this.http.put('https://cmsb-app-default-rtdb.firebaseio.com/contacts.json', contactString, { headers})
  // add to database
  this.http.post<{ message: string, contacts: Contact }>('http://localhost:3000/api/contacts',
  contacts,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contacts);
        this.sortAndSend();
      }
    );
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newContact.id = originalContact.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/api/contacts/' + originalContact.id,
  newContact, { headers: headers })
    .subscribe(
      (response: any) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
}

deleteContact(contacts: Contact) {

  if (!contacts) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === contacts.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/api/contacts/' + contacts.id)
    .subscribe(
      (response: any) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
}

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
        let currentId = parseInt(contact.id);
        if (currentId > maxId) {
        maxId = currentId;
        }
    }
    return maxId;
  }

  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice())
  }
}




