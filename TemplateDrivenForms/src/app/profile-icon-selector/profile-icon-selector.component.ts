import { CommonModule } from '@angular/common';
import { Component, forwardRef, Provider } from '@angular/core';
import { profileIconNames} from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = 
{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() =>ProfileIconSelectorComponent ),
  multi:true
}

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
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