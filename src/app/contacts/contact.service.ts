import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {


contactSelected = new EventEmitter<Contact>()

contactChanged = new EventEmitter<Contact[]>()


private contacts: Contact [] = [new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/jacksonk.jpg', []),
new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/barzeer.jpg', [])
];

constructor() {this.contacts = MOCKCONTACTS;

  }

getContacts(): Contact []{
  return this.contacts.slice();

}

getContact(id: string) : Contact {
  for (let contact of this.contacts) {
    if(contact.id == id) {
       return contact;
    }
  }
  return null!;
}

getSingleContact(id: number){
  return this.contacts[id];
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
 }



