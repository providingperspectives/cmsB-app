import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input() document!: Document;

  documents: Document[] =[ new Document('341','CSE-341','Web Back End Development','https://byui.instructure.com/courses/224426',[]),
  new Document('430','WDD-430','Full-Stack Development','https://byui.instructure.com/courses/219644',[])];

  constructor(){}

  ngOnInit() {

  }
}

