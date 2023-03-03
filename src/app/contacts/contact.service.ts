import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
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
maxContactId: number;




private contacts: Contact [] = [new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/jacksonk.jpg', []),
new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/barzeer.jpg', [])
];

constructor() {this.contacts = MOCKCONTACTS;
              this.maxContactId = this.getMaxId();

  }

getContacts(): Contact []{
  return this.contacts.slice();

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

addContact(newContact: Contact) {
  if (!newContact) {
      return;
  }
  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact)
  let contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactsListClone);

}

deleteContact(contact: Contact) {
  if (!contact) {
    return;
}
let pos = this.contacts.indexOf(contact);
if (pos < 0) {
    return;
}
this.contacts.splice(pos, 1);
let contactsListClone = this.contacts.slice();
this.contactChanged.next(contactsListClone);
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
      return
  }
  let pos = this.contacts.indexOf(originalContact);
  if (pos < 0) {
      return;
  }
  newContact.id = originalContact.id;
  this.contacts[pos] = newContact;
  let contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactsListClone);

}



 }



