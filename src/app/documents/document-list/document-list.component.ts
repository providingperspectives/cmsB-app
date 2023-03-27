import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
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

  @Output() documentWasSelceted= new EventEmitter<Document>();

 private docChangeSub!: Subscription;
 term!: string;
 documents: Document[] = [];

 onDocumentSelected(document: Document) {
  this.documentWasSelceted.emit(document);
  console.log('this document was selected '+document)
}


constructor(private documentService: DocumentService,
            private route:ActivatedRoute,
            private router:Router){}

ngOnInit() {
this.documentService.getDocuments().subscribe(
  (documents: Document[]) => {
    this.documents = documents;
  },
  (error: any) => {
    console.log('Error fetching documents: ', error);
  }
);
}
  onNewDocument(){
    this.router.navigate(['newDocument'], {relativeTo: this.route});

   }

  ngOnDestroy() {
    this.docChangeSub.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }

}


