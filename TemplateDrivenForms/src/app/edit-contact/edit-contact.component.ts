import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms'
import {Contact} from '../contacts/contact.model'
import { ContactsService } from '../contacts/contacts.service';
import {phoneValueTypes} from '../contacts/contact.model';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneValueTypes = phoneValueTypes
  contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    },
  }
phonetype: any;
  constructor(private route: ActivatedRoute, private contactService: ContactsService, private router:Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactService.getContact(contactId).subscribe(cont =>{
      if(cont)
      this.contact = cont;
    })
  }

  saveContact(form: NgForm) {
    console.log(form.value)
    this.contactService.saveContact(form.value).subscribe({
  //  this.contactService.saveContact(this.contact).subscribe({
    next: () => this.router.navigate(['/contacts'])
   })
  }
}
