import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch:'full' },
  { path: 'contacts', component: ContactsComponent, children:[
    {path: 'newContact', component: ContactEditComponent},
    {path: 'new', component: ContactEditComponent},
     {path: ':id', component: ContactDetailComponent},
     {path: ':id/edit', component: ContactEditComponent}
  ]},

  {path: 'documents', component: DocumentsComponent, children:[
    {path: 'newDocument', component: DocumentEditComponent},
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent}
  ]},

  { path: 'messages', component: MessageListComponent },

];

@ NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]


})

export class AppRoutingModule{


}

