import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
onContactSelected(_t9: Contact) {
throw new Error('Method not implemented.');
}
@Output() contactWasSelected = new EventEmitter<Contact>();

  contacts: Contact [] = [new Contact ('1', 'Rex Barzee','barzeer@byui.edu','208-496-3769', '../../assets/barzeer.jpg', [null]),
                          new Contact ('2', 'R. Kent Johnson','jacksonk@byui.edu','208-496-3771', '../../assets/jacksonk.jpg', [null])
];

  constructor() {}

  ngOnInit(){ }

  onSelected(contact: Contact) {
  this.contactWasSelected.emit(contact);

}
}
