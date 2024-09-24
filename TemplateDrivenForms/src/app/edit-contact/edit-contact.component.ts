import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms'
import {Contact} from '../contacts/contact.model'
import { ContactsService } from '../contacts/contacts.service';
@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
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
  constructor(private route: ActivatedRoute, private contactService: ContactsService, private router:Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactService.getContact(contactId).subscribe(cont =>{
      if(cont)
      this.contact = cont;
    })
  }

  saveContact() {
   this.contactService.saveContact(this.contact).subscribe({
    next: () => this.router.navigate(['/contacts'])
   })
  }
}
