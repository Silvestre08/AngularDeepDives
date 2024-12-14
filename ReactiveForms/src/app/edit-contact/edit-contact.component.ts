import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues } from '../contacts/contact.model';
import { addressTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words-validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router, private fb: FormBuilder) { }
  phoneTypes = phoneTypeValues;
  addressTypeValues = addressTypeValues;

  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    isPersonal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null> null,
    favoritesRanking: <number | null> null,
    notes: ['', restrictedWords(['foo', 'bar'])],
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      postalCode: ['',Validators.required],
      addressType: '',
    })
  });

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(
      (contact) => {
        if(!contact) return;
        for(let i =1; i< contact.phones.length; i++){
          this.contactForm.controls.phones.push(this.createPhoneGroup());
        }
        this.contactForm.setValue(contact);
      }
    )
  }

createPhoneGroup(){
  return this.fb.nonNullable.group({
    phoneNumber: '',
    phoneType: '',
  })
}

addPhone(){
  this.contactForm.controls.phones.push(this.createPhoneGroup())
}

  get firstName()
  {
    return this.contactForm.controls.firstName;

  }
  get notes() 
  {
    return this.contactForm.controls.notes;
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    })
  }

  cancel(){
    this.router.navigate(['/contacts'])
  }
}
