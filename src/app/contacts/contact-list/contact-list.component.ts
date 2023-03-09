import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{

  contacts!: Contact[];
  private clChangeSub!: Subscription;


  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router ) {}

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    this.clChangeSub = this.contactService.contactChanged
      .subscribe((contacts: Contact[]) => {
        this.contacts= contacts;
      });

    }

    ngOnDestroy(): void {
    this.clChangeSub.unsubscribe();
    }

onNewContact() {
  this.router.navigate(['newContact'], {relativeTo: this.route});

      }

}

