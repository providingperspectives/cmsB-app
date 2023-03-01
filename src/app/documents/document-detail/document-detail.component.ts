import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindServiceService } from 'src/app/wind-service.service';






@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  document!: Document;
  id!: number;
  nativeWindow: any;

  documents: Document[] =[ new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
  new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];

  constructor(private documentService: DocumentService,
              private windowService: WindServiceService,
              private route: ActivatedRoute,
              private router: Router)
              {
               this.nativeWindow = windowService.getNativeWindow();
              }


  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params
    .subscribe((params: Params) => {
      this.id = +params['id'];
      console.log('the single id '+ this.id)
      this.document = this.documentService.getSingleDocument(this.id);
      console.log('this document from Single '+ this.document.id)

    });

  }

  onEditDocument() {
  //this.router.navigate(['edit'], {relativeTo: this.route});
}

onView() {
  if (this.document.url) {
    this.nativeWindow.open(this.document.url);
  }
}

onDeleteDocument() {
  this.documentService.deleteDocument(this.document);
  this.router.navigate(['documents'], {relativeTo: this.route})

}

}




