import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {  ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  contacts!: Contact[];


  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router ) {}

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChanged
      .subscribe((contacts: Contact[]) => {
        this.contacts= contacts;
      });

    }

onNewContact() {
  this.router.navigate(['newContact'], {relativeTo: this.route});

      }

}

