import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css']
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {

  profileIcons = profileIconNames;
  showAllIcons: boolean = true
  selectedIcon!: string | null;
  
  onChange!: Function;
  onTouched!: Function;

  iconSelected(icon: string){
    this.showAllIcons = false;
    console.log(icon)
    this.selectedIcon = icon;
    this.onChange(icon)
  }

  writeValue(icon: string | null): void{
this.selectedIcon = icon;

if(icon && icon !=='')
  this.showAllIcons = false
else
this.showAllIcons = true;
}
registerOnChange(fn: any): void {
  this.onChange =(icon: string) =>{fn(icon)}
  // it is this callback that actually updates the data model.
}
registerOnTouched(fn: any): void {
  this.onTouched = fn
}
setDisabledState?(isDisabled: boolean): void {
}
}
