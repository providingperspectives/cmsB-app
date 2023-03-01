import { ActivatedRoute, Router, Params } from '@angular/router';
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
  id!: number;



  contacts: Contact[] =[ new Contact('1', 'R. Kent Jackson','jacksonk@byui.edu', '208-496-3771','../../assets/jacksonk.jpg', [])
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

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'], {relativeTo: this.route})

  }



}

