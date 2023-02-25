import { Component, OnInit, Input} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{

  @Input() contact!: Contact;

  constructor(){}

  contacts: Contact[] =[ new Contact('1', 'R. Kent Jackson','jacksonk@byui.edu', '208-496-3771','../../assets/jacksonk.jpg', [])
  ];

 

  ngOnInit(){

  }

}
