import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues } from '../contacts/contact.model';
import { addressTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words-validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
    if (!contactId) {
      this.subscribeToAddressChanges();
      return;
    }

    this.contactsService.getContact(contactId).subscribe(
      (contact) => {
        if(!contact) return;
        for(let i =1; i< contact.phones.length; i++){
          this.addPhone();
        }
        this.contactForm.setValue(contact);
        this.subscribeToAddressChanges();
      }
    )
  }

createPhoneGroup(){
  const phoneGroup = this.fb.nonNullable.group({
    phoneNumber: '',
    phoneType: '',
    preferred: false
  })

  phoneGroup.controls.preferred.valueChanges
  // this pipe prevents and infinite loop. When calling updateValueAndValidity we may cause a reaction where values and vbalidity will trigger another revalidation, etc-.
  .pipe(distinctUntilChanged((a,b)=> this.stringifyCompare(a, b)))
  .subscribe(value => {
    if(value){
      phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
      }
      else{
        phoneGroup.controls.phoneNumber.removeValidators([Validators.required]);
      }
      // so that angular is aware that validation rules have changed 
      //if we are still showing error messages when the validators have been removed (they need to disappear)
      phoneGroup.controls.phoneNumber.updateValueAndValidity();
  })
  return phoneGroup
}

stringifyCompare(a: any, b: any){
  return JSON.stringify(a) === JSON.stringify(b)
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

  subscribeToAddressChanges(){
    const addressGroup = this.contactForm.controls.address;
    addressGroup.valueChanges
    .pipe(distinctUntilChanged((a,b)=> this.stringifyCompare(a, b)))
    .subscribe(() => {
      for(const controlName in addressGroup.controls){
        addressGroup.get(controlName)?.removeValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity()
      }
    })

    addressGroup.valueChanges
    .pipe(debounceTime(2000),distinctUntilChanged((a,b)=> this.stringifyCompare(a, b)))
    .subscribe(() => {
      for(const controlName in addressGroup.controls){
        addressGroup.get(controlName)?.addValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity()
      }
    })
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
