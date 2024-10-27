import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms'
import { Contact } from '../contacts/contact.model'
import { ContactsService } from '../contacts/contacts.service'
import { phoneValueTypes, addressValueTypes } from '../contacts/contact.model'

import { RestrictedWordsValidator } from '../validators/restricted-words-validator.directive'
import { DateValueAccessorDirective} from '../date-value-accessor/date-value-accessor.directive'

import { ProfileIconSelectorComponent } from "../profile-icon-selector/profile-icon-selector.component";

@Component({
    imports: [CommonModule, FormsModule, RestrictedWordsValidator, ProfileIconSelectorComponent, DateValueAccessorDirective],
    standalone: true,
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
    phoneValueTypes = phoneValueTypes
    addressValueTypes = addressValueTypes
    contact: Contact = {
        id: '',
        icon: '',
        personal: false,
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        favoritesRanking: 0,
        notes: '',
        phones: [{
            phoneNumber: '',
            phoneType: '',
        }],
        address: {
            streetAddress: '',
            city: '',
            state: '',
            postalCode: '',
            addressType: '',
        },
    }
    phonetype: any
    constructor(
        private route: ActivatedRoute,
        private contactService: ContactsService,
        private router: Router
    ) {}

    ngOnInit() {
        const contactId = this.route.snapshot.params['id']
        if (!contactId) return

        this.contactService.getContact(contactId).subscribe((cont) => {
            if (cont) this.contact = cont
        })
    }

    saveContact(form: NgForm) {
        console.log(form.value)
        this.contactService.saveContact(this.contact).subscribe({
        // this.contactService.saveContact(form.value).subscribe({
            //  this.contactService.saveContact(this.contact).subscribe({
            next: () => this.router.navigate(['/contacts']),
        })
    }

    addPhone(){
        this.contact.phones.push({
            phoneNumber: '',
            phoneType: '',
    });
    }
}
