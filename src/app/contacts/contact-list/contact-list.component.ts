import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import {  ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts!: Contact[];
  editMode: boolean = false;
  term!: string;


  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router ) {}


  ngOnInit(){
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );

  //  this.contacts = this.contactService.getContacts();
   // this.clChangeSub = this.contactService.contactChanged
   //   .subscribe((contacts: Contact[]) => {
   //     this.contacts= contacts;
   //   });


    }

    //ngOnDestroy(): void {
    //this.clChangeSub.unsubscribe();
   // }


   onNewContact() {
    this.router.navigate(['newContact'], {relativeTo: this.route});
    this.editMode = true;
      console.log('this is the staus '+ this.editMode)

        }

    search(value: string) {
    this.term = value;
  }


}

