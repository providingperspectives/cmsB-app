import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{

 documents!: Document [];
 private docChangeSub!: Subscription;

constructor(private documentService: DocumentService,
            private route:ActivatedRoute,
            private router:Router){}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.docChangeSub = this.documentService.documentChanged
      .subscribe((documents: Document[]) =>{
        this.documents = documents;
      });
  }

  ngOnDestroy(): void {
    this.docChangeSub.unsubscribe();
  }


  onNewDocument(){
    this.router.navigate(['newDocument'], {relativeTo: this.route});

   }


}


