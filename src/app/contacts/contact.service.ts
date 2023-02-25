import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
[x: string]: any;

contactSelected = new EventEmitter<Contact>();

private contacts: Contact [] = [new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/jacksonk.jpg', []),
new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/barzeer.jpg', [])
];
 

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

constructor() {
this.contacts = MOCKCONTACTS;

}
}
