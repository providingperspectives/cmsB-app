import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';



@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{

  contact!: Contact;
  id!: number;



  contacts: Contact[] =[ new Contact('1', 'R. Kent Jackson','jacksonk@byui.edu', '208-496-3771','../../assets/jacksonk.jpg', []),
                         new Contact('2', 'Bradley Armstrong','armstrongb@byui.edu', '208-496-3766','../../assets/armstrongb.jpg', [])
  ];

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {}



  ngOnInit(){

    this.route.params
        .subscribe(
          (params: Params) =>{
              this.id = +params['id'];
              this.contact = this.contactService.getSingleContact(this.id);
          }
        );
  }

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }


 onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'], {relativeTo: this.route})

  }



}

