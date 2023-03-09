import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{


  originalDocument!: Document;
  document!: Document;
  editMode: boolean =  false;
  id!: number;


constructor(private route: ActivatedRoute,
            private router: Router,
            private documentService: DocumentService){}

onCancel(){
this.router.navigate(['/documents'], {relativeTo: this.route});
}
            
onSubmit(form: NgForm){
const value = form.value;
//this.editMode = true;
const newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
newDocument.name = value.name;
newDocument.description = value.description;
newDocument.url = value.url;
console.log('this is the state of this edit mode '+ this.editMode)
if (this.editMode === true) 
{
  this.documentService.updateDocument(this.originalDocument, newDocument);
  console.log('Update Succsess')
} else {
  console.log('this is the new document '+ newDocument)
  this.documentService.addDocument(newDocument);
  console.log('Addition Succsess')
}
this.router.navigate(['/documents']);
console.log(this.documentService.getDocuments())

}


  ngOnInit(){

this.route.params.subscribe((params: Params) => {
const id = params['id'];
console.log('the doc id is '+ id)
if (id == null) {
  this.editMode = false;
  console.log("Edit mode is: "+ this.editMode);
  return;
}
this.originalDocument = this.documentService.getDocument(id);
console.log('this.originalDocument.id ' +this.originalDocument.id)
if (this.originalDocument == null) {
  return;
}
this.editMode = true;
console.log("Edit mode is: "+ this.editMode);
this.document = JSON.parse(JSON.stringify(this.originalDocument));
})
}



}
